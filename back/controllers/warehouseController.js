const { Router } = require('express');
const { Op } = require('sequelize');
const { Warehouse } = require('../models');
const { authorize } = require('../middlewares/auth');
const { ROLES: { ADMIN, MANAGER, DISPATCHER } } = require('../constants');
const validate = require('../middlewares/validate');

const router = Router();
const auth = authorize(ADMIN, MANAGER, DISPATCHER);

router.get('/', auth, async (req, res) => {
  const { companyId } = req;

  const clients = await Warehouse.findAll({
    where: { linkedCompanyId: companyId },
  });

  res.status(200).json(clients);
});

router.post('/create', [auth, validate.warehouse], async (req, res) => {
  const { email, name } = req.body;
  const { companyId: linkedCompanyId } = req;

  try {
    const duplicateWarehouse = await Warehouse.findOne({
      where: {
        [Op.or]: [
          { name },
          { email }
        ]
      }
    });

    if (duplicateWarehouse) {
      if (duplicateWarehouse.email === email) {
        return res.status(400).json({ message: 'Email уже используется!' });
      }
      if (duplicateWarehouse.name === name) {
        return res.status(400).json({ message: 'Склад с таким названием уже существует' });
      }
    }

    const newWarehouse = await Warehouse.create({
      ...req.body,
      linkedCompanyId,
    });

    return res.status(200).json(newWarehouse);

  } catch (e) {
    return res.status(500).json(e);
  }
});

router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { companyId: linkedCompanyId } = req;

  const warehouse = await Warehouse.findOne({ where: { id, linkedCompanyId } });

  if (!warehouse) {
    return res.status(400).json({ error: { message: 'Склад не найден' } });
  }

  try {
    await warehouse.update(req.body);
    return res.status(200).json(warehouse);
  } catch (e){
    return res.status(500).json(e);
  }
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
