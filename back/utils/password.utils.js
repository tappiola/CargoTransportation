const generatePassword = require('password-generator');
const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}/;

module.exports.passwordRegExp = passwordRegExp;
module.exports.createRandomPassword = () => {
  const maxLength = 15;
  const minLength = 8;

  let password = '';
  const randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;

  while (!passwordRegExp.test(password)) {
    password = generatePassword(randomLength, false, /[\w\d\?\-]/);
  }

  return password;
};

