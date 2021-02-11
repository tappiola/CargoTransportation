const { Router } = require('express');
const { Waybill, WaybillStatus, ConsignmentNote, Warehouse, Client, ControlPoint } = require('../models');
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

module.exports = router;
