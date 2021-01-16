const jwt = require('jsonwebtoken');

module.exports.isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split('Bearer ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.jwtToken, (err, user) => {
    if (err) {
      return res.sendError(403, err.message);
    }

    req.user = user;
    next();
  });
};
