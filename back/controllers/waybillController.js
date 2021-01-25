const { Router } = require('express');
const {
  Waybill,
  WaybillStatus,
  ConsignmentNote,
  Warehouse,
} = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const { companyId } = req.query;

  const clients = await Waybill.findAll({
    attributes: {
      exclude: ['waybillStatusId', 'consignmentNoteId'],
    },
    where: { linkedCompanyId: companyId },
    include: [
      {
        model: WaybillStatus,
        attributes: ['status'],
      },
      {
        model: ConsignmentNote,
        attributes: ['number'],
      },
    ],
  });

  res.status(200).json(clients);
});

router.delete('/', async (req, res) => {
  const ids = req.body;

  await Waybill.destroy({
    where: {
      id: ids.map((id) => Number(id)),
    },
  });

  res.status(204).end();
});

module.exports = router;
