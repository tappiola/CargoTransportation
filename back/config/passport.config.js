const { Strategy } = require('passport-local');
const User = require('../models/User');

module.exports = (passport) => {
  passport.use(
    new Strategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user || !user.isValidPassword(password, user.password)) {
            return done(null, false, { error: { message:'Email или пароль введены неверно' } });
          }
          if (!user.isActive) {
            return done(null, false, { error: { message:'Ваша учетная запись не активирована. Обратитесь к администратору.' } });
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
    User.findByPk(id).then(user => {
      if (!user) {
        done(user.error, null)
      }

      done(null, user.get());
    });
  });
};
