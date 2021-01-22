const Joi = require('@hapi/joi');

const consignmentNoteSchema = Joi.object({
  number: Joi.number().required(),
  issuedDate: Joi.string(),
  revenue: Joi.number(),
  clientId: Joi.number().required(),
  vehicle: Joi.string().required(),
  driverId: Joi.number().required(),
  assignedToId: Joi.number().required(),
  passportNumber: Joi.string().required(),
  passportIssuedBy: Joi.string().required(),
  passportIssuedAt: Joi.string().required(),
  goods: Joi.array().required(),
});

module.exports = { consignmentNoteSchema };
