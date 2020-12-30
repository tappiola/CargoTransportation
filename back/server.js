require('dotenv').config();
const express = require('express'),
	path = require('path'),
	serverConfig = require('./config/server.config'),
	routes = require('./routes'),
	errorHandler = require('./middlewares/errorHandler'),
	serverStart = require('./config/server.start');

const app = express();
serverConfig(app);
routes(app);

if ( process.env.NODE_ENV === 'production' ) {
	app.use(express.static('../front/build'));
	app.get('*', ( req, res ) => {
		res.sendFile(path.resolve(__dirname, '../front/build', 'index.html'));
	});
}

errorHandler(app);
serverStart(app);
