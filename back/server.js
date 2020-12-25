const express = require( 'express' );
const cors = require( 'cors' );
const path = require( 'path' );

const app = express();
const PORT = process.env.PORT || 5000;

app.use( cors() );
app.use( express.json() );

if ( process.env.NODE_ENV === 'production' ) {
   app.use( express.static( path.resolve( __dirname, 'front/build' ) ) );
}

//+ Error handler
app.use( ( req, res, next ) => {
   const err = new Error( 'not found' );
   err.status = 404;
   next( err );
} );

app.use( ( err, req, res, next ) => {
   const status = err.status || 500;
   res.status( status ).json( { error : { message : err.message } } );
} );
//- Error handler

app.get( '*', async ( req, res ) => {
   res.send( 'ok' );
} );

app.listen( PORT, () => {
   console.log( `Server has started on port ${PORT}` );
} );