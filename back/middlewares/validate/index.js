const middleware = require('./middleware');
const { loginSchema, registerSchema } = require('./schemas/users');
const {consignmentNoteSchema} = require('./schemas/consignmentNotes');

module.exports.login = middleware(loginSchema);
module.exports.register = middleware(registerSchema);
module.exports.consignmentNote = middleware(consignmentNoteSchema);
