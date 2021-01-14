const { Router } = require('express');
const passport = require('passport');

const { User, Role, Company } = require('../models');
const { createRandomPassword } = require('../utils/password.utils');
const { sendEmail, setMailOptions } = require('../utils/mail/mail.utils');
const registerTemplate = require('../utils/mail/tmpl/register');
const validate = require('../middlewares/validate');

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
  res.redirect(`../users?ids=${ids}`);
});

router.post('/register', async (req, res, next) => {
  const { email, companyId, ...userData } = req.body;
  const user = await User.findOne({ where: { email } });
  const company = await Company.findByPk(companyId);

  if (user) {
    return res.status(400).json({ error: { message: 'Email already in use!' } });
  }
  if (!company) {
    return res.status(400).json({ error: { message: 'Company not found' }});
  }

  try {
    const password = createRandomPassword();
    const newUser = await User.create({
      ...userData,
      email,
      password,
      // isActive: true,
    });

    await newUser.setCompany(company);

    // const mail = setMailOptions({
    //   to: process.env.NODE_ENV === 'production' ? email : process.env.GMAIL_USER,
    //   subject: 'Registration in "Transportation system"',
    //   html: registerTemplate(email, password),
    // });

    // sendEmail(mail).then((res) => console.log('Email sent...', res.messageId)).catch((err) => Logger.error(err.message));

    res.status(200).json({});
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  res.redirect(`../users/${id}`);
});

module.exports = router;
