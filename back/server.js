require( 'dotenv' ).config();
const express = require( 'express' ),
   cors = require( 'cors' ),
   path = require( 'path' ),
   routes = require( './routes' ),
   morgan = require( 'morgan' ),
   db = require( './database/db' ),
   PORT = process.env.PORT || 5000;

const app = express();
app.use( morgan( process.env.NODE_ENV === 'production' ? 'tiny' : 'dev' ) );
app.use( cors() );
app.use( express.json() );
app.get( '/favicon.ico', ( req, res ) => res.status( 204 ) );
routes( app );

if ( process.env.NODE_ENV === 'production' ) {
   app.use( express.static( '../front/build' ) );
   app.get( '*', ( req, res ) => {
      res.sendFile( path.resolve( __dirname, '../front/build', 'index.html' ) );
   } );
}

//+ Error handler
app.use( ( req, res, next ) => {
   const err = new Error( 'not found' );
   err.status = 404;
   next( err );
} );

app.use( ( err, req, res ) => {
   const status = err.status || 500;
   res.status( status ).json( { error : { message : err.message } } );
} );
//- Error handler

//Database connection
(async () => {
   try {
      await db.connect();
      console.log( `DB CONNECTED SUCCESSFULLY` );
      
      //JUST FOR NOW
      const userController = require( './controllers/users/user.controller' );
      await userController.checkDBTable();
      
      app.listen( PORT, () => {
         console.log( `Server has started on port ${PORT}` );
      } );
   } catch (e) {
      console.log( 'DB CONNECTION FAILED' );
      process.exit( 1 );
   }
})();
