const middleware = require('./middleware');
const { loginSchema, registerSchema } = require('./schemas/users');
const {consignmentNoteSchema} = require('./schemas/consignmentNotes');

module.exports = {
  login: middleware(loginSchema),
  register: middleware(registerSchema),
  consignmentNote: middleware(consignmentNoteSchema),
};
