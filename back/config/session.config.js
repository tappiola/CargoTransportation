const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');
const configurePassport = require('./passport.config');

module.exports = (app) => {
  app.use(cookieParser(process.env.SESSIONSDB_SECRET));
  app.use(expressSession({
    secret: process.env.SESSIONSDB_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }));

  configurePassport(passport);
  app.use(passport.initialize());
  app.use(passport.session());
};
