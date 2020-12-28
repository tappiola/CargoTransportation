const jwt = require( 'jsonwebtoken' );
const bcrypt = require( 'bcrypt' );
const { authSchema, registerSchema } = require( '../../middlewares/validation_schema' );
//
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

const getSignedToken = ( { id, email, firstname, lastname } ) => {
   return jwt.sign( {
      id        : id,
      email     : email,
      firstName : firstname,
      lastName  : lastname
   }, process.env.jwtToken || 'secret', { expiresIn : '1h' } );
};

const hashPassword = async value => {
   const salt = await bcrypt.genSalt( 10 );
   return bcrypt.hash( value, salt );
};

const isPasswordValid = ( value, password ) => {
   try {
      return bcrypt.compare( value, password );
   } catch (error) {
      throw new Error( error );
   }
};

module.exports.checkDBTable = async () => {
   const isExists = await db.checkIfTableExists( 'users' );
   if ( !isExists ) {
      try {
         await db.query( `CREATE TABLE users
                          (
                              id        serial primary key,
                              firstname VARCHAR(255) NOT NULL,
                              surname   varchar(255),
                              lastname  varchar(255) NOT NULL,
                              login     varchar(50)  NOT NULL,
                              email     varchar(50)  NOT NULL,
                              password  varchar(255) NOT NULL,
                              birthday  date,
                              city      varchar(255),
                              street    varchar(255),
                              house     varchar(5),
                              apartment varchar(5)
                          )` );
      } catch (e) {
         console.log( e.message );
      }
   }
};