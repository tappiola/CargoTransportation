const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const sessionConfig = require('./session.config');

module.exports = (app) => {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'tiny' : 'dev'));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.get('/favicon.ico', (req, res) => res.status(204));
  sessionConfig(app);
};
