const middleware = require('./middleware');
const { loginSchema, registerSchema } = require('./schemas/users');

module.exports.login = middleware(loginSchema);
module.exports.register = middleware(registerSchema);
