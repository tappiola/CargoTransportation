const jwt = require( 'jsonwebtoken' );
const bcrypt = require( 'bcrypt' );
const db = require( '../../database/db' );
//
const dbTableName = 'users';
//
exports.main = async ( req, res ) => {
   const request = await db.query( `SELECT * FROM ${dbTableName}` );
   const users = request.rows;
   
   res.send( users );
};

exports.register = async ( req, res, next ) => {
   const { email, password } = req.body;
   
   const { rows } = await db.query( `SELECT * FROM ${dbTableName} WHERE email=$1`, [ email ] );
   const user = rows[0];
   
   if ( user ) {
      return res.status( 400 ).json( { error : { message : 'Email already in use!' } } );
   }
   
   try {
      const data = req.body;
      data.password = hashPassword( password );
      
      const newUser = await db.createItem( dbTableName, data );
      const token = getSignedToken( newUser );
      
      res.status( 200 ).json( { token } );
   } catch (e) {
      e.status = 400;
      next( e );
   }
};

exports.login = async ( req, res ) => {
   const { email, password } = req.body;
   
   const request = await db.query( `SELECT * FROM ${dbTableName}
        WHERE email=$1`, [ email ] );
   const user = request.rows[0];
   
   if ( !user ) {
      return res.status( 400 ).json( { error : { message : 'invalid email/password' } } );
   }
   const isValid = isPasswordValid( password, user.password );
   
   if ( !isValid ) {
      return res.status( 400 ).json( { error : { message : 'invalid password' } } );
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

const hashPassword = value => {
   const salt = bcrypt.genSalt( 10 );
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