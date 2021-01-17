const { Router } = require('express');
const { Client } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const { companyId } = req.query;

  const clients = await Client.findAll({
    where: { linkedCompanyId: companyId },
  });

  res.status(200).json(clients);
});

router.delete('/', async (req, res) => {
  const ids = req.body;

  await Client.destroy({
    where: {
      id: ids.map((id) => Number(id)),
    },
  });

  res.status(204).json({});
});

module.exports = router;
