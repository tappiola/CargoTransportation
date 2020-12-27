const jwt = require( 'jsonwebtoken' );
const bcrypt = require( 'bcrypt' );
const db = require( '../../database/db' );
//
const dbTableName = 'users';
//
exports.main = async ( req, res ) => {
   await checkDBTable( dbTableName );
   
   const request = await db.query( `SELECT * FROM ${dbTableName}` );
   const users = request.rows;
   
   res.send( users );
};

exports.register = async ( req, res, next ) => {
   await checkDBTable( dbTableName );
   
   const {email, password} = req.body;
   
   const request = await db.query( `SELECT * FROM ${dbTableName} WHERE email=$1`, [ email ] );
   const user = request.rows[0];
   
   if ( user ) {
      return res.status( 403 ).json( { error : { message : 'Email already in use!' } } );
   }
   
   try {
      const data = JSON.parse( JSON.stringify( req.body ) );
      data.password = await hashPassword( password );
      
      const newUser = await db.createItem( dbTableName, data );
      const token = getSignedToken( newUser );
      res.status( 200 ).json( { token } );
   } catch (e) {
      e.status = 400;
      next( e );
   }
};

exports.login = async ( req, res, next ) => {
   await checkDBTable( dbTableName );

   const { email, password } = req.body;
   
   const request = await db.query( `SELECT * FROM ${dbTableName}
        WHERE email=$1`, [ email ] );
   const user = request.rows[0];
   
   if ( !user ) {
      return res.status( 403 ).json( { error : { message : 'invalid email/password' } } );
   }
   const isValid = await isPasswordValid( password, user.password );
   
   if ( !isValid ) {
      return res.status( 403 ).json( { error : { message : 'invalid password' } } );
   }
   
   const token = getSignedToken( user );
   res.status( 200 ).json( { token } );
};

const getSignedToken = user => {
   return jwt.sign( {
      id        : user.id,
      email     : user.email,
      firstName : user.firstName,
      lastName  : user.lastName
   }, process.env.jwtToken || 'secret', { expiresIn : '1h' } );
};

const hashPassword = async ( value ) => {
   const salt = await bcrypt.genSalt( 10 );
   const passwordHash = await bcrypt.hash( value, salt );
   return passwordHash;
};

const isPasswordValid = async ( value, password ) => {
   try {
      return await bcrypt.compare( value, password );
   } catch (error) {
      throw new Error( error );
   }
};

const checkDBTable = async name => {
   const isExists = await db.isTableExists( name );
   if ( !isExists ) {
      try {
         await db.query( `CREATE TABLE ${name}
         (
            id serial primary key,
            firstname VARCHAR(255) NOT NULL,
            surname varchar(255),
            lastname varchar(255) NOT NULL,
            login varchar(255) NOT NULL,
            email varchar(50) NOT NULL,
            password varchar(255) NOT NULL,
            birthday date,
            city varchar(255),
            street varchar(255),
            house varchar(5),
            apartment varchar(5)
         )` );
      } catch (e) {
         console.log( e.message );
      }
   }
};