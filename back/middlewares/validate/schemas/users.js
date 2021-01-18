const Joi = require('@hapi/joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  apartment: Joi.string().allow(null, ''),
  birthday: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  firstName: Joi.string().required(),
  house: Joi.string().required(),
  lastName: Joi.string().required(),
  middleName: Joi.string().required(),
  roles: Joi.array().required(),
  password: Joi.string(),
  street: Joi.string().required(),
  isActive: Joi.bool().allow(null, ''),
  companyId: Joi.number().allow(null, ''),
});

module.exports = { loginSchema, registerSchema };
