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
    attributes: [
      'id', 'departedAt', 'expectedArrivalAt', 'fullAddress', 'country', 'city', 'street', 'house',
    ],
    where: { linkedCompanyId: companyId },
    include: [
      {
        model: WaybillStatus,
        attributes: ['status'],
      },
      {
        model: ConsignmentNote,
        attributes: ['number'],
        include: [
          {
            model: Warehouse,
            attributes: ['fullAddress', 'country', 'city', 'street', 'house'],
          },
        ],
      },
    ],
  });
  res.status(200).json(clients);
});

router.delete('/', async (req, res) => {
  const { ids } = req.query;

  await Waybill.destroy({
    where: {
      id: ids.split(',').map((id) => +id),
    },
  });

  res.status(204).json({});
});

module.exports = router;
