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
const { authorize } = require('../middlewares/auth');
const { ROLES: { GLOBAL_ADMIN, ADMIN } } = require('../constants');

const router = Router();
const auth = authorize(ADMIN, GLOBAL_ADMIN);

router.post('/register', [auth, validate.register], async (req, res, next) => {
  const { companyId } = req;
  const { email, roles: role, ...userData } = req.body;
  const user = await User.findOne({ where: { email } });
  const company = await Company.findByPk(companyId);
  const roles = await Role.findAll({ where: { role } });

  if (user) {
    return res.status(400).json({ error: { message: 'Email уже используется!' } });
  }

  try {
    const password = createRandomPassword();
    const newUser = await User.create({
      email,
      password,
      ...userData,
      isActive: true,
    });

    if (company) {
      await newUser.setCompany(company);
    }

    if (roles) {
      await newUser.setRoles(roles);
    }
    const token = newUser.generateJWT();
    const mail = setMailOptions({
      to: process.env.SEND_TO_USER ? email : process.env.GMAIL_USER,
      subject: 'Registration in "Transportation system"',
      html: registerTemplate(email, password),
    });

    sendEmail(mail)
      .then(({ messageId }) => Logger.log('Email sent...', messageId))
      .catch((err) => Logger.error(err.message));

    return res.status(200).json({ token });
  } catch (e) {
    e.status = 400;
    return next(e);
  }
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: 'Неверно введен email либо пароль' });
    }

    return req.login(user, async (error) => {
      if (error) {
        return res.status(401).json(error);
      }

      const token = user.generateJWT();
      const { roles } = await User.findOne({
        where: {
          id: user.id,
        },
        attributes: [],
        include: [
          {
            model: Role,
            attributes: ['role'],
          },
          {
            model: Company,
            attributes: ['id'],
          },
        ],
      });

      return res.status(200).json({ token, roles });
    });
  })(req, res, next);
});

router.get('/', authorize(GLOBAL_ADMIN, ADMIN), async (req, res) => {
  const users = await User.findAll({
    attributes: {
      exclude: ['password'],
    },
    include: [
      {
        model: Role,
        where: { role: ADMIN },
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
  return res.status(200).json(users);
});

router.get('/:id', authorize(GLOBAL_ADMIN, ADMIN), async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id },
    include: [
      {
        model: Role,
      },
      {
        model: Company,
        attributes: ['name', 'unn'],
      },
    ],
    attributes: {
      exclude: ['password'],
    },
  });

  res.status(200).json(user);
});

router.delete('/', async (req, res) => {
  const ids = req.body;

  await User.destroy({
    where: { id: ids.map((id) => Number(id)) },
  });

  res.status(204).end();
});

router.get('/logout', authorize(), (req, res) => {
  req.logout();
  res.status(204).end();
});

router.put('/:id', authorize(GLOBAL_ADMIN, ADMIN), async (req, res) => {
  const { password, roles: role, ...userData } = req.body;
  const user = await User.findByPk(req.params.id);
  const roles = await Role.findAll({ where: { role } });

  if (!user) {
    return res.status(400).json({ error: { message: 'user not found' } });
  }

  if (roles) {
    await user.setRoles(roles);
  }

  await user.update(userData, { password });

  return res.status(200).json(user);
});

module.exports = router;
