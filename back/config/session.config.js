const cookieParser = require('cookie-parser'),
  expressSession = require('express-session'),
  passport = require('passport');

module.exports = app => {
  app.use(cookieParser(process.env.SESSIONSDB_SECRET));
  app.use(expressSession({
    secret: process.env.SESSIONSDB_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    }
  }));
  
  require('./passport.config')(passport);
  app.use(passport.initialize());
  app.use(passport.session());
};
