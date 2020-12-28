const Joi = require( '@hapi/joi' );

const authSchema = Joi.object( {
   email    : Joi.string().email().lowercase().required(),
   password : Joi.string().min( 3 ).required()
} );

const registerSchema = Joi.object( {
   firstName : Joi.string(),
   lastName  : Joi.string(),
   login     : Joi.string(),
   email     : Joi.string().email().lowercase().required(),
   password  : Joi.string().min( 3 ).required()
} );

module.exports = {
   authSchema,
   registerSchema
};