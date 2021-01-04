const { Router } = require('express');
const router = Router();
const { createRandomPassword } = require('../utils/password.utils');
const { getSignedToken } = require('../utils/token.utils');
const Users = require('../models/Users');
const validate = require('../middlewares/validate');
const { sendEmail, setMailOptions } = require('../utils/mail/mail.utils');
const registerTemplate = require('../utils/mail/tmpl/register');

router.get('/', async ( req, res ) => {
  const users = await Users.findAll({
    order : [
      [ 'id', 'DESC' ],
      [ 'lastName', 'ASC' ]
    ]
  });
  res.status(200).json(users);
});

router.post('/register', validate.register, async ( req, res, next ) => {
  const { email } = req.body;
  const user = await Users.findOne({ where : { email } });
  
  if ( user ) {
    return res.status(400).json({ error : { message : 'Email already in use!' } });
  }
  
  try {
    const password = createRandomPassword();
    const newUser = await Users.create({ email, password });
    const token = getSignedToken(newUser);
    
    const mail = setMailOptions({
      to      : process.env.NODE_ENV === 'production' ? email : process.env.GMAIL_USER,
      subject : 'Registration in "Transportation system"',
      html    : registerTemplate(email, password)
    });
    
    sendEmail(mail).then(res => console.log('Email sent...', res.messageId)).catch(err => console.log(err.message));
    
    res.status(200).json({ token });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.post('/login', validate.login, async ( req, res ) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ where : { email } });
  
  if ( !user ) {
    return res.status(401).json({ error : { message : 'invalid email/password' } });
  }
  
  const isValid = user.isValidPassword(password);
  if ( !isValid ) {
    return res.status(401).json({ error : { message : 'invalid password' } });
  }
  
  const token = getSignedToken(user);
  res.status(200).json({ token });
});

router.get('/:id', async ( req, res ) => {
  const user = await Users.findByPk(req.params.id);
  res.status(200).json(user);
});

module.exports = router;
