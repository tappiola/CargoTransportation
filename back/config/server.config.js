const express = require('express'),
  cors = require('cors'),
  morgan = require('morgan');

module.exports = app => {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'tiny' : 'dev'));
  app.use(cors());
  app.use(express.json());
  app.get('/favicon.ico', ( req, res ) => res.status(204));
};
