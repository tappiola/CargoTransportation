const Logger = require('../config/logger');
const {Router} = require('express');
const router = Router();
const {createRandomPassword} = require('../utils/password.utils');
const Users = require('../models/Users');
const validate = require('../middlewares/validate');
const {sendEmail, setMailOptions} = require('../utils/mail/mail.utils');
const registerTemplate = require('../utils/mail/tmpl/register');
const passport = require('passport');

router.get('/', async (req, res) => {
  const users = await Users.findAll({
    order: [
      ['id', 'DESC'],
      ['lastName', 'ASC'],
    ],
  });
  res.status(200).json(users);
});

router.post('/register', validate.register, async (req, res, next) => {
  const {email} = req.body;
  const user = await Users.findOne({where: {email}});
  
  if (user) {
    return res.status(400).json({error: {message: 'Email already in use!'}});
  }
  
  try {
    const password = createRandomPassword();
    const newUser = await Users.create({email, password});
    const token = newUser.generateJWT();
    
    const mail = setMailOptions({
      to: process.env.NODE_ENV === 'production' ? email : process.env.GMAIL_USER,
      subject: 'Registration in "Transportation system"',
      html: registerTemplate(email, password),
    });
    
    sendEmail(mail).then(res => console.log('Email sent...', res.messageId)).catch(err => Logger.error(err.message));
    
    res.status(200).json({token});
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
      return res.status(401).json({message: 'invalid email/password'});
    }
    
    req.login(user, (err) => {
      if (err) {
        return res.status(401).json(err);
      }
      
      const token = user.generateJWT();
      res.status(200).json({token});
    });
  })(req, res, next);
});

router.get('/:id', async (req, res) => {
  const user = await Users.findByPk(req.params.id);
  res.status(200).json(user);
});

router.delete('/:id', async (req, res) => {
  await Users.destroy({where: {id: req.params.id}});
  res.status(200).send('ok');
});

router.get('/logout', (req, res) => {
  req.logout();
});

module.exports = router;
