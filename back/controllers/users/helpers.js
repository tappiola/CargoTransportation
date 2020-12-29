const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );

module.exports.hashPassword = async value => {
   const salt = await bcrypt.genSalt( 10 );
   return bcrypt.hash( value, salt );
};

module.exports.isPasswordValid = ( value, password ) => {
   try {
      return bcrypt.compare( value, password );
   } catch (error) {
      throw new Error( error );
   }
};

module.exports.getSignedToken = ( { id, email } ) => {
   return jwt.sign( {
      id    : id,
      email : email
   }, process.env.jwtToken || 'secret', { expiresIn : '1h' } );
};
