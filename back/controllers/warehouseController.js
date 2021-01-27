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
