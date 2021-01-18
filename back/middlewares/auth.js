const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
const Logger = require('../config/logger');

const verifyUser = async (req, res, next, roles) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split('Bearer ')[1];

  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const user = jwt.verify(token, process.env.jwtToken);
    const hasPermission = await User.findOne({
      where: { id: user.id },
      include: { 
        model: Role, 
        where: roles.length ? { role: roles } : {}
      },
    });
   
    if (!hasPermission) {
      throw new Error('Forbidden');
    } 
    
    req.user = user;
    next();
  } catch(err) {
    Logger.error(err);
    return res.status(403).json({ error: { message: 'Forbidden' } });
  }
};

const authorize = (...roles) => (req, res, next) =>
  Promise
    .resolve(verifyUser(req, res, next, roles))
    .catch(next);

module.exports = { authorize };
