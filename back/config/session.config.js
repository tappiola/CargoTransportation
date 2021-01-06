const cookieParser = require('cookie-parser'),
  expressSession = require('express-session'),
  SequelizeStore = require('connect-session-sequelize')(expressSession.Store),
  db = require('../database/db');

const sessionStore = new SequelizeStore({db});
const sessionMaxAge = 24 * 60 * 60 * 1000;  // The maximum age (in milliseconds) of a valid session.

module.exports = app => {
  app.use(cookieParser(process.env.SESSIONSDB_SECRET));
  app.use(expressSession({
    secret: process.env.SESSIONSDB_SECRET,
    store: sessionStore,
    resave: true,
    saveUninitialized: false,
    proxy: true, // if you do SSL outside of node.
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge:sessionMaxAge
    }
  }));
  
  sessionStore.sync();
};
