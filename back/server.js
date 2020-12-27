const express = require( 'express' );
const cors = require( 'cors' );
const path = require( 'path' );
const routes = require( './routes' );

const app = express();
const PORT = process.env.PORT || 5000;

app.use( cors() );
app.use( express.json() );

app.get( '/favicon.ico', ( req, res ) => res.status( 204 ) );

if ( process.env.NODE_ENV === 'production' ) {
   app.use( '/', express.static( path.resolve( __dirname, '../front/build' ) ) );
   
   app.get( '*', ( req, res ) => {
      res.sendFile( path.resolve( __dirname, '../front/build', 'index.html' ) );
   } );
}

routes( app );
app.get( '*', ( req, res ) => {
   res.json( { message : 'ok' } );
} );

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
require( './database/db' ).connectDb();

app.listen( PORT, () => {
   console.log( `Server has started on port ${PORT}` );
} );