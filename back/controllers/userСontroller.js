const { Router } = require('express');
const passport = require('passport');
const Logger = require('../config/logger');
const { createRandomPassword, isValidPassword } = require('../utils/password.utils');
const User = require('../models/User');
const Role = require('../models/Role');
const Company = require('../models/Company');
const validate = require('../middlewares/validate');
const { sendEmail, setMailOptions } = require('../utils/mail/mail.utils');
const registerTemplate = require('../utils/mail/tmpl/register');
const { isAuth } = require('../middlewares/auth');
const router = Router();

router.post('/register', validate.register, async (req, res, next) => {
  const { email, companyId, ...userData } = req.body;
  const user = await User.findOne({ where: { email } });
  const company = await Company.findByPk(companyId);

  if (user) {
    return res.status(400).json({ error: { message: 'Email already in use!' } });
  }

  try {
    const password = createRandomPassword();
    const newUser = await User.create({
      email,
      ...userData,
      isActive: true,
    });

    if (company) {
      await newUser.setCompany(company);
    }
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
      return res.status(401).json({ message: 'Неверно введен email либо пароль' });
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

router.get('/', isAuth, async (req, res) => {
  const users = await User.findAll({
    attributes: {
      exclude: ['password'],
    },
    include: [
      {
        model: Role,
        where: { role: 'admin' }
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

router.get('/:id', isAuth, async (req, res) => {
  const user = await User.get(req.params.id);
  
  res.status(200).json(user);
});

router.delete('/', async (req, res) => {
  const { ids } = req.query;

  await User.destroy({
    where: { id: ids.split(',').map((id) => Number(id)),
    },
  });

  res.status(204).json(null);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.status(204).json({});
});

router.put('/:id', isAuth, async (req, res) => {
  const { password: newPassword, roles: rolesArray, ...userData } = req.body;
  const user = await User.findByPk(req.params.id);
  const roles = await Role.findAll({ where: { role: rolesArray } });
  const password =  isValidPassword(newPassword) ? newPassword : user.password;
  
  if (!user) {
    return res.status(400).json({ error: { message: 'user not found' } });
  }

  if (roles) {
    await user.setRoles(roles); 
  }
  await user.update({ ...userData, password });
  
  res.status(200).json(user);
});

module.exports = router;
