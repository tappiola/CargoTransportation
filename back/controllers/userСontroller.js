const { Router } = require('express');
const passport = require('passport');
const Logger = require('../config/logger');
const { createRandomPassword } = require('../utils/password.utils');
const User = require('../models/User');
const Role = require('../models/Role');
const Company = require('../models/Company');
const validate = require('../middlewares/validate');
const { sendEmail, setMailOptions } = require('../utils/mail/mail.utils');
const registerTemplate = require('../utils/mail/tmpl/register');

const router = Router();

router.post('/register', validate.register, async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (user) {
    return res.status(400).json({ error: { message: 'Email already in use!' } });
  }

  try {
    const password = createRandomPassword();
    const newUser = await User.create({ email, password, isActive: true });
    const token = newUser.generateJWT();

    const mail = setMailOptions({
      to: process.env.NODE_ENV === 'production' ? email : process.env.GMAIL_USER,
      subject: 'Registration in "Transportation system"',
      html: registerTemplate(email, password),
    });

    sendEmail(mail).then((res) => console.log('Email sent...', res.messageId)).catch((err) => Logger.error(err.message));

    res.status(200).json({ token });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: 'invalid email/password' });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(401).json(err);
      }

      const token = user.generateJWT();
      res.status(200).json({ token });
    });
  })(req, res, next);
});

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'fullName', 'lastName', 'firstName', 'middleName', 'email', 'isActive'],
    include: [
      {
        model: Role,
        attributes: [],
        where: { role: 'admin' },
      },
      {
        model: Company,
        attributes: ['name', 'unn'],
      },
    ],
    order: [
      ['id', 'DESC'],
      ['lastName', 'ASC'],
    ],
  });
  res.status(200).json(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.status(200).json(user);
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

router.get('/logout', (req, res) => {
  req.logout();
  res.status(204).json({});
});

module.exports = router;
