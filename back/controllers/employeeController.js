const { User, Role, Company } = require('../models');
const {Router} = require('express');

const router = Router();

router.get('/', async (req, res) => {
  const { companyId } = req.query;

  const users = await User.findAll({
    attributes: {
      exclude: ['password'],
    },
    include: [
      {
        model: Role,
      },
      {
        model: Company,
        attributes: [],
        where: { id: companyId },
      },
    ],
  });
  res.status(200).json(users);
});

router.delete('/', async (req, res) => {
  const { ids } = req.query;
  res.redirect(`../users?ids=${ids}`);
});

router.post('/register', async (req, res, next) => {
  res.redirect('../users/register')
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  res.redirect(`../users/${id}`);
});

module.exports = router;
