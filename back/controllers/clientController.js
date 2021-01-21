const { Router } = require('express');
const { Client } = require('../models');
const { authorize } = require('../middlewares/auth');

const router = Router();

router.get('/', async (req, res) => {
  const { companyId } = req.query;

  const clients = await Client.findAll({
    where: { linkedCompanyId: companyId },
  });

  res.status(200).json(clients);
});

router.put('/:id', authorize('manager', 'dispatcher', 'admin'), async (req, res) => {
  const { companyId,...clientData } = req.body;
  const client = await Client.findOne({ where: {
    id: req.params.id,
    linkedCompanyId: companyId,
  } });

  if (!client) {
    return res.status(400).json({ error: { message: 'client not found' } });
  }

  await client.update(clientData);

  res.status(200).json(client);
});

router.delete('/', async (req, res) => {
  const ids = req.body;

  await Client.destroy({
    where: {
      id: ids.map((id) => Number(id)),
    },
  });

  res.status(204).end();
});

module.exports = router;
