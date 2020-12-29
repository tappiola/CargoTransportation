require( 'dotenv' ).config();
const express = require( 'express' ),
   path = require( 'path' ),
   routes = require( './routes' );

const app = express();

//Server configuration
const serverConfig = require( './config/server.config' );
serverConfig( app );

//Routes
routes( app );

if ( process.env.NODE_ENV === 'production' ) {
   app.use( express.static( '../front/build' ) );
   app.get( '*', ( req, res ) => {
      res.sendFile( path.resolve( __dirname, '../front/build', 'index.html' ) );
   } );
}

//Error handler
const errorHandler = require( './middlewares/errorHandler' );
errorHandler( app );

//Database connection and server start
const serverStart = require( './config/server.start' );
serverStart( app );
