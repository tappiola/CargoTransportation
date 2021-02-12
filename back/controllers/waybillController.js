const { Router } = require('express');
const { Waybill, WaybillStatus, ConsignmentNote, Warehouse, Client, Good, ControlPoint, ControlPointStatus } = require('../models');
const { authorize } = require('../middlewares/auth');
const { ROLES, WAYBILL_STATUSES_ID } = require('../constants');

const auth = authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.DISPATCHER);

const router = Router();

router.get('/', auth, async (req, res) => {
  const { companyId: linkedCompanyId } = req;

  const waybills = await Waybill.findAll({
    attributes: {
      exclude: ['waybillStatusId', 'consignmentNoteId'],
    },
    where: { linkedCompanyId },
    include: [
      {
        model: WaybillStatus,
        attributes: ['status'],
      },
      {
        model: ConsignmentNote,
        attributes: ['number'],
      },
      {
        model: Warehouse,
      },
    ],
  });

  res.status(200).json(waybills);
});

router.delete('/', auth, async (req, res) => {
  const ids = req.body;

  await Waybill.destroy({
    where: {
      id: ids.map((id) => Number(id)),
    },
  });

  res.status(204).end();
});

router.post('/', auth, async (req, res) => {
  const { consignmentNoteId, warehouseId } = req.body;
  const consignmentNote = await ConsignmentNote.findOne({ where: { id: consignmentNoteId } });
  const { linkedCompanyId, clientId } = consignmentNote;

  const { country, city, street, house } = await Client.findByPk(clientId);

  const { id } = await Waybill.create({
    waybillStatusId: WAYBILL_STATUSES_ID.IN_PROCESS,
    warehouseId,
    consignmentNoteId,
    linkedCompanyId,
    country,
    city,
    street,
    house,
  });

  res.status(200).json({ id });
});

router.get('/mobile/:driverId', async (req, res) => {
  const { driverId } = req.params;

  if (!driverId) {
    return res.status(400);
  }

  const waybills = await Waybill.findAll({
    include: [
      {
        model: WaybillStatus,
      },
      {
        model: ConsignmentNote,
        where: { driverId },
        include: [{ model: Client }, { model: Good }],
      },
      {
        model: Warehouse
      },
      {
        model: ControlPoint,
        order: [
          ['expectedArrivalAt', 'ASC'],
        ],
        include: [{ model: ControlPointStatus }],
      },
    ],
    order: [
      ['id', 'DESC'],
    ],
  });

  return res.status(200).json(waybills);
});

router.put('/mobile/checkPoint/:pointId', auth, async (req, res) => {
  const point = await ControlPoint.findOne({ where: { id: req.params.pointId } });
  if (!point) {
    res.status(400);
  }

  const updatedPoint = await ControlPoint.update(
    { controlPointStatusId: 2 },
    { where: { id: req.params.pointId } },
  );

  return res.status(200).json(updatedPoint);
});

router.put('/mobile/finish/:id', async (req, res) => {
  const {id} = req.params;
  const waybill = await Waybill.findOne({where: {id}});

  if (!waybill) {
    return res.status(400).json({error: {message: 'Путевой лист не найден.'}});
  }

  try {
    waybill.waybillStatusId = WAYBILL_STATUSES_ID.COMPLETED;
    await waybill.save();

    res.status(200);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
