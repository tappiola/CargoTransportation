const { Router } = require('express');

const router = Router();
const { authorize } = require('../middlewares/auth');
const { ROLES: { GLOBAL_ADMIN, ADMIN, MANAGER } } = require('../constants');

const auth = authorize(GLOBAL_ADMIN, ADMIN, MANAGER);
const { Company } = require('../models');

router.get('/', auth, async (req, res) => {
  const companies = await Company.findAll();

  res.status(200).json(companies);
});

router.get('/:id', auth, async (req, res) => {
  const company = await Company.findByPk(req.params.id);

  res.status(200).json(company);
});

router.post('/create', auth, async (req, res) => {
  try {
    const newCompany = await Company.create({
      ...req.body,
    });
    return res.status(200).json(newCompany);
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Некорректные данные' });
  }

  try {
    const company = await Company.findByPk(id);
    await company.update(req.body);

    return res.status(200).end();
  } catch (e) {
    return res.status(400).json({ message: 'Ошибка обновления' });
  }
});

router.delete('/', async (req, res) => {
  const ids = req.body.map((id) => Number(id));

  await Company.destroy({
    where: {
      id: ids,
    },
  });

  res.status(204).end();
});

module.exports = router;
