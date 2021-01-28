const Joi = require('@hapi/joi');

const warehouseSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  house: Joi.string().required(),
  isTrusted: Joi.boolean(),
});

module.exports = { warehouseSchema };
