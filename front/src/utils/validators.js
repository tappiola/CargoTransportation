const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}/;
const emailRegExp = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/;

export const validatePassword = (password) => passwordRegExp.test(password);

export const validateEmail = (email) => emailRegExp.test(email);
