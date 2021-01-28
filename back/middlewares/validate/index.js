const middleware = require('./middleware');
const { loginSchema, registerSchema } = require('./schemas/users');
const { consignmentNoteSchema } = require('./schemas/consignmentNotes');
const { warehouseSchema } = require('./schemas/warehouses');

module.exports = {
  login: middleware(loginSchema),
  register: middleware(registerSchema),
  consignmentNote: middleware(consignmentNoteSchema),
  warehouse: middleware(warehouseSchema),
};
