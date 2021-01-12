const { Strategy } = require('passport-local');
const User = require('../models/User');

module.exports = (passport) => {
  passport.use(
    new Strategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user || !user.isValidPassword(password, user.password)) {
            return done(null, false, { errors: { 'email or password': 'is invalid' } });
          }

          return done(null, user);
        })
        .catch(done);
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findByPk(id, (err, user) => {
      done(err, user);
    });
  });
};
