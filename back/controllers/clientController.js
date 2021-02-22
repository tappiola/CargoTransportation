const { Router } = require('express');
const { Client } = require('../models');
const { authorize } = require('../middlewares/auth');
const { ROLES: { ADMIN, MANAGER, DISPATCHER } } = require('../constants');

const router = Router();
const auth = authorize(ADMIN, MANAGER, DISPATCHER);

router.get('/', auth, async (req, res) => {
  const { companyId } = req;

  const clients = await Client.findAll({ where: { linkedCompanyId: companyId } });

  res.status(200).json(clients);
});

router.post('/register', auth, async (req, res, next) => {
  const { email, ...clientData } = req.body;
  const { companyId: linkedCompanyId } = req;

  const client = await Client.findOne({ where: { email } });
  
  if (client) {
    return res.status(400).json({ message: 'Email уже используется!' });
  }

  try {
    const newClient = await Client.create({
      email,
      linkedCompanyId,
      ...clientData,
    });

    return res.status(200).json(newClient);
  } catch (e) {
    e.status = 400;
    return next(e);
  }
});

router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { ...clientData } = req.body;
  const { companyId: linkedCompanyId } = req;

  const client = await Client.findOne({ where: { id, linkedCompanyId } });

  if (!client) {
    return res.status(400).json({ message: 'Не найдено' });
  }

  await client.update(clientData).catch((err) => {
    res.status(400).json(err);
  });

  return res.status(200).json(client);
});

router.delete('/', auth, async (req, res) => {
  const ids = req.body;
  const { companyId: linkedCompanyId } = req;

  await Client.destroy({
    where: {
      id: ids.map((id) => Number(id)),
      linkedCompanyId,
    },
  });

  res.status(204).end();
});

module.exports = router;
