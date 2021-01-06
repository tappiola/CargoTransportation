const jwt = require('jsonwebtoken');

module.exports.getSignedToken = ({id, email}) => {
  return jwt.sign({
    id: id,
    email: email
  }, process.env.jwtToken || 'secret', {expiresIn: '1h'});
};
