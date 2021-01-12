const { Router } = require('express');
const { User, Role, Company } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const { companyId } = req.query;

  const users = await User.findAll({
    attributes: ['id', 'fullName', 'lastName', 'firstName', 'middleName', 'email', 'isActive'],
    include: [
      {
        model: Role,
        attributes: ['role'],
        through: { attributes: [] },
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

  await User.destroy({
    where: {
      id: ids.split(',').map((id) => +id),
    },
  });

  res.status(204).json({});
});

module.exports = router;
