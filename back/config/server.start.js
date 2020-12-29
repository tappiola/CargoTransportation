const db = require( '../database/db' ),
   PORT = process.env.PORT || 5000;

module.exports = async ( app ) => {
   try {
      await db.authenticate();
      console.log( 'Database connected successfully' );
      
      app.listen( PORT, () => {
         console.log( `Server has started on port ${PORT}` );
      } );
   } catch (e) {
      console.log( 'Database connected FAILED' );
      process.exit( 1 );
   }
};