const { Router } = require('express');
const { Warehouse } = require('../models');
const { authorize } = require('../middlewares/auth');
const { ROLES: { ADMIN, MANAGER, DISPATCHER } } = require('../constants');

const router = Router();
const auth = authorize(ADMIN, MANAGER, DISPATCHER);

router.get('/', auth, async (req, res) => {
  const { companyId } = req;

  const clients = await Warehouse.findAll({
    where: { linkedCompanyId: companyId },
  });

  res.status(200).json(clients);
});

router.post('/create', auth, async (req, res, next) => {
  const { email, name } = req.body;
  const { companyId: linkedCompanyId } = req;

  const warehouseWithEmail = await Warehouse.findOne({ where: { email } });

  if (warehouseWithEmail) {
    return res.status(400).json({ message: 'Email уже используется!' });
  }

  const warehouseWithName = await Warehouse.findOne({ where: { name } });

  if (warehouseWithName) {
    return res.status(400).json({ message: 'Склад с таким названием уже существует' });
  }

  try {
    const newWarehouse = await Warehouse.create({
      ...req.body,
      linkedCompanyId,
    });

    return res.status(200).json(newWarehouse);
  } catch (e) {
    e.status = 400;
    return next(e);
  }
});

router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { ...clientData } = req.body;
  const { companyId: linkedCompanyId } = req;

  const warehouse = await Warehouse.findOne({ where: { id, linkedCompanyId } });

  if (!warehouse) {
    return res.status(400).json({ error: { message: 'Склад не найден' } });
  }

  await warehouse.update(clientData).catch((err) => {
    res.status(400).json(err);
  });

  return res.status(200).json(warehouse);
});

router.delete('/', async (req, res) => {
  const ids = req.body;

  await Warehouse.destroy({
    where: {
      id: ids.map((id) => Number(id)),
    },
  });

  res.status(204).end();
});

module.exports = router;
