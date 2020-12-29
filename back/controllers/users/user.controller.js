const { authSchema, registerSchema } = require( '../../middlewares/validation_schema' );
//
const { hashPassword, isPasswordValid, getSignedToken } = require( './helpers' );
const Users = require( '../../models/Users' );
//
exports.main = async ( req, res ) => {
   const users = await Users.findAll();
   res.status( 200 ).json( users );
};

exports.register = async ( req, res, next ) => {
   const result = await registerSchema.validateAsync( req.body );
   
   const user = await Users.findOne( { email : result.email } );
   if ( user ) {
      return res.status( 400 ).json( { error : { message : 'Email already in use!' } } );
   }
   
   try {
      result.password = await hashPassword( result.password );
      const newUser = Users.create( result );
      const token = getSignedToken( newUser );
      
      res.status( 200 ).json( { token } );
   } catch (e) {
      e.status = 400;
      next( e );
   }
};

exports.login = async ( req, res ) => {
   const result = await authSchema.validateAsync( req.body );
   
   const user = await Users.findOne( { email : result.email } );
   if ( !user ) {
      return res.status( 401 ).json( { error : { message : 'invalid email/password' } } );
   }
   
   const isValid = isPasswordValid( result.password, user.password );
   if ( !isValid ) {
      return res.status( 401 ).json( { error : { message : 'invalid password' } } );
   }
   
   const token = getSignedToken( user );
   res.status( 200 ).json( { token } );
};