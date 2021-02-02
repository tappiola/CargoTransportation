require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./back/routes');
const serverConfig = require('./back/config/server.config');
const errorHandler = require('./back/middlewares/errorHandler');
const serverStart = require('./back/config/server.start');

serverConfig(app);
routes(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('front/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'front/build', 'index.html'));
  });
}

errorHandler(app);
serverStart(app);
