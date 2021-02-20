const { Router } = require('express');

const router = Router();
const { authorize } = require('../middlewares/auth');
const { ROLES: { GLOBAL_ADMIN, ADMIN } } = require('../constants');

const auth = authorize(GLOBAL_ADMIN, ADMIN);
const { Company } = require('../models');

router.get('/', auth, async (req, res) => {
  const companies = await Company.findAll();

  res.status(200).json(companies);
});

module.exports = router;
