const express = require('express'),
  cors = require('cors'),
  morgan = require('morgan'),
  sessionConfig = require('./session.config');

module.exports = app => {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'tiny' : 'dev'));
  app.use(cors());
  app.use(express.json());
  app.get('/favicon.ico', (req, res) => res.status(204));
  sessionConfig(app);
};
