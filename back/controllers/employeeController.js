const { Router } = require('express');

const { User, Role, Company } = require('../models');
const { authorize } = require('../middlewares/auth');
const { ROLES: { ADMIN, DISPATCHER, MANAGER } } = require('../constants');

const router = Router();
const auth = authorize(ADMIN, DISPATCHER, MANAGER);

router.get('/', auth, async (req, res) => {
  const { companyId: id } = req;
  const { role } = req.query;

  const users = await User.findAll({
    attributes: {
      exclude: ['password'],
    },
    include: [
      {
        model: Role,
        where: (role ? { role } : {}),
      },
      {
        model: Company,
        attributes: [],
        where: { id },
      },
    ],
  });

  res.status(200).json(users);
});

router.delete('/', authorize(ADMIN), async (req, res) => {
  const ids = req.body;

  await User.destroy({
    where: { id: ids.map((id) => Number(id)) },
  });

  res.status(204).end();
});

router.post('/register', authorize(ADMIN), async (req, res) => {
  res.redirect(307, '../users/register');
});

router.put('/:id', authorize(ADMIN), async (req, res) => {
  const { id } = req.params;
  res.redirect(`../users/${id}`);
});

module.exports = router;
