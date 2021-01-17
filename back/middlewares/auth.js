const jwt = require('jsonwebtoken');

module.exports.isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split('Bearer ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.jwtToken, (err, user) => {
    if (err) {
      return res.status(403).json({ error: { message: 'Forbidden' } });
    }

    req.user = user;
    next();
  });
};
