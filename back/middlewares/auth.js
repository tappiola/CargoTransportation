const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
const Company = require('../models/Company');
const Logger = require('../config/logger');

const verifyUser = async (req, res, next, roles) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split('Bearer ')[1];

  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const { id } = jwt.verify(token, process.env.jwtToken);
    const user = await User.findOne({
      where: { id },
      include: [{
        model: Role,
        where: roles.length ? { role: roles } : {},
      },
      {
        model: Company,
        attributes: ['name']
      }]
    });

    if (!user) {
      throw new Error();
    }

    req.companyId = user.companyId;
    req.userId = user.id;
    req.fullName = user.fullName;
    req.companyName = user.company ? user.company.name : null;
    req.roles = user.roles.map(({ role }) => role);
    
    return next();
  } catch(err) {
    Logger.error(err);
    return res.status(403).json({ message: 'Forbidden' });
  }
};

const authorize = (...roles) => (req, res, next) => (
  Promise
    .resolve(verifyUser(req, res, next, roles))
    .catch(next)
);

module.exports = { authorize };
