const { Router } = require('express');
const { Waybill, WaybillStatus, ConsignmentNote, Warehouse, Client, Good, ControlPoint } = require('../models');
const { authorize } = require('../middlewares/auth');
const { ROLES, WAYBILL_STATUSES_ID, CONTROL_POINT_STATUSES_ID } = require('../constants');

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

router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const waybill = await Waybill.findOne({
    where: { id },
    include: [{
      model: Warehouse,
    }]
  });
  const controlPoints = await ControlPoint.findAll({ where: { waybillId: id } });

  res.status(200).json({ waybill, controlPoints });
});

router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { client, warehouse, points } = req.body;
  const [country, city, street, house] = warehouse.fullAddress.split(', ');

  await ControlPoint.destroy({ where: { waybillId: id } });

  if (points) {
    await ControlPoint.bulkCreate(
      points.map((controlPoint) => ({
        controlPointStatusId: CONTROL_POINT_STATUSES_ID.EXPECTED,
        waybillId: id,
        ...controlPoint,
      }))
    );
  }

  const waybill = await Waybill.update(
    {
      departedAt: client.departedAt,
      expectedArrivalAt: warehouse.expectedArrivalAt,
      waybillStatusId: WAYBILL_STATUSES_ID.ISSUED,
      country,
      city,
      street,
      house,
    },
    {
      where: { id },
    }
  );

  res.status(200).json(waybill);
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
      },
    ],
    order: [
      ['id', 'DESC'],
    ],
  });

  return res.status(200).json(waybills);
});

router.put('/mobile/checkPoint/:pointId', async (req, res) => {
  const point = await ControlPoint.findOne({ where: { id: req.params.pointId } });
  if (!point) {
    res.status(400);
  }

  try {
    point.controlPointStatusId = 2;
    await point.save();

    return res.status(200).json(point);
  } catch (e) {
    return res.status(400).json({ error:{ message:e.message } });
  }
});

router.put('/mobile/finish/:id', async (req, res) => {
  const { id } = req.params;
  const waybill = await Waybill.findOne({ where: { id } });

  if (!waybill) {
    return res.status(400).json({ error: { message: 'Путевой лист не найден.' } });
  }

  try {
    waybill.waybillStatusId = WAYBILL_STATUSES_ID.COMPLETED;
    await waybill.save();

    return res.status(200).json(waybill);
  } catch (e) {
    return res.status(400).json({ error:{ message:e.message } });
  }
});

module.exports = router;
