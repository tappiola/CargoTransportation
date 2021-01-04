const Joi = require('@hapi/joi');

const loginSchema = Joi.object({
  email    : Joi.string().email().required(),
  password : Joi.string().required()
});

const registerSchema = Joi.object({
  email : Joi.string().email().required()
});

module.exports = { loginSchema, registerSchema };
