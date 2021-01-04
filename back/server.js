require('dotenv').config();
const express = require('express');
const path = require('path');
const serverConfig = require('./config/server.config');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const serverStart = require('./config/server.start');

const app = express();
serverConfig(app);
routes(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../front/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../front/build', 'index.html'));
  });
}

errorHandler(app);
serverStart(app);
