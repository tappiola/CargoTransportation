const generatePassword = require('password-generator');

const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}/;

const isValidPassword = (password) => password.length < 15 && passwordRegExp.test(password);

const createRandomPassword = () => {
  const maxLength = 15;
  const minLength = 8;
  const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}/;

  let password = '';
  const randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;

  while (!passwordRegExp.test(password)) {
    password = generatePassword(randomLength, false, /[\w\d\?\-]/);
  }

  return password;
};

module.exports = { createRandomPassword, isValidPassword };
