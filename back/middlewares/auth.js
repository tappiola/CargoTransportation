const jwt = require('jsonwebtoken');

module.exports.isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split('Bearer ')[1];
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.jwtToken, (err, user) => {
    if (err) {
      return res.status(403).json(err);
    }
    
    req.user = user;
    next();
  });
};

// module.exports.isAuth = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.status(401).json({message: 'You are not authorized'});
//   }
// };

// module.exports.isAdmin = (req, res, next) => {
//   if (req.isAuthenticated() && req.user.roles.admin) {
//     next();
//   } else {
//     res.status(401).json({message: 'You are not authorized because eou are not admin'});
//   }
// };
