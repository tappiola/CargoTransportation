const express = require( 'express' );
const cors = require( 'cors' );

const app = express();
const PORT = process.env.PORT || 5000;

app.use( cors() );
app.use( express.json() );

app.get( '*', async ( req, res ) => {
   res.send( 'ok' );
} );

app.listen( PORT, () => {
   console.log( `Server has started on port ${PORT}` );
} );