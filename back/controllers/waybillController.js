const { Router } = require('express');
const { Waybill, WaybillStatus, ConsignmentNote, Warehouse, Client } = require('../models');
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
  const { id: consigmentNoteId } = req.body;
  const consigmentNote = await ConsignmentNote.findOne({ where: { id: consigmentNoteId } });
  const { id: consignmentNoteId, linkedCompanyId, clientId } = consigmentNote;

  const { country, city, street, house } = await Client.findByPk(clientId);

  const { id } = await Waybill.create({
    waybillStatusId: WAYBILL_STATUSES_ID.IN_PROCESS,
    warehouseId: 1,
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
