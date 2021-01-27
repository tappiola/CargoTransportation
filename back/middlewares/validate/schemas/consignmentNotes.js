const Joi = require('@hapi/joi');

const consignmentNoteSchema = Joi.object({
  number: Joi.number().required(),
  issuedDate: Joi.string().required(),
  revenue: Joi.number(),
  clientId: Joi.number().required(),
  driverId: Joi.number().required(),
  assignedToId: Joi.number().required(),
  passportNumber: Joi.string().required(),
  passportIssuedBy: Joi.string().required(),
  passportIssuedAt: Joi.string().required(),
  vehicle: Joi.string().required(),
  goods: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    cost: Joi.number().required(),
    unit: Joi.string().required(),
    weight: Joi.number().required(),
    notes: Joi.string().allow(null, ''),
  })).required(),
});

module.exports = { consignmentNoteSchema };
