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

router.post('/register', authorize('admin', 'manager', 'dispatcher'), async (req, res, next) => {
  const { email, companyId: linkedCompanyId, ...clientData } = req.body;
  const client = await Client.findOne({ where: { email } });
  
  if (client) {
    return res.status(400).json({ error: { message: 'Email already in use!' } });
  }

  try {
    const newClient = await Client.create({
      email,
      linkedCompanyId,
      ...clientData,
    });

    res.status(200).json(newClient);
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.put('/:id', authorize('admin', 'manager', 'dispatcher'), async (req, res) => {
  const { id } = req.params;
  const { companyId: linkedCompanyId, ...clientData } = req.body;
  const client = await Client.findOne({ where: { id, linkedCompanyId } });

  if (!client) {
    return res.status(400).json({ error: { message: 'client not found' } });
  }

  await client.update(clientData);

  res.status(200).json(client);
});

router.delete('/', authorize('admin', 'manager'), async (req, res) => {
  const ids = req.body;
  
  await Client.destroy({
    where: {
      id: ids.map((id) => Number(id)),
    },
  });

  res.status(204).end();
});

module.exports = router;
