require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./back/routes');
const serverConfig = require('./back/config/server.config');
const errorHandler = require('./back/middlewares/errorHandler');
const serverStart = require('./back/config/server.start');
require('express-ws')(app);

serverConfig(app);
routes(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'front/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'front/build', 'index.html'));
  });
}

errorHandler(app);
serverStart(app);
