const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const favicon = require('express-favicon');
const sessionConfig = require('./session.config');

module.exports = (app) => {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'tiny' : 'dev'));
  app.use(fileUpload({ createParentPath: true }));
  app.use(cors());
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(favicon(path.jsoin(__dirname, '../../front/public/favicon.ico')));
  sessionConfig(app);
};
