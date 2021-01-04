const jwt = require('jsonwebtoken');

module.exports.getSignedToken = ({ id, email }) => jwt.sign({
  id,
  email,
}, process.env.jwtToken || 'secret', { expiresIn: '1h' });
