const { Router } = require('express');
const { Warehouse } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const { companyId } = req.query;

  const clients = await Warehouse.findAll({
    where: { linkedCompanyId: companyId },
  });
  res.status(200).json(clients);
});

router.delete('/', async (req, res) => {
  const ids = req.body;

  await Warehouse.destroy({
    where: {
      id: ids.map((id) => Number(id)),
    },
  });

  res.status(204).json({});
});

module.exports = router;
