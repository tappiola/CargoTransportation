const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');

const verifyUser = (req, res, next, roles) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split('Bearer ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.jwtToken, async (err, user) => {
    const hasPermission = !err && !!(await User.findOne({
      where: { id: user.id },
      include: { 
        model: Role, 
        where: roles.length ? { role: roles } : {}
      },
    }));

    if (hasPermission) {
      req.user = user;
      next();
    } else {
      return res.status(403).json({ error: { message: 'Forbidden' } });
    }
  });
};

const isAuthAs = (...roles) => (req, res, next) =>
  Promise
    .resolve(verifyUser(req, res, next, roles))
    .catch(next);

module.exports = { isAuthAs };
