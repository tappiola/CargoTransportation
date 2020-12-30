const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}/;
const emailRegExp = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/;

export const validatePassword = (password) => passwordRegExp.test(password);

export const validateEmail = (email) => emailRegExp.test(email);

export const textValidator = (str) => typeof str === 'string' && str.length > 2;

export const emailValidator = (email) => validateEmail(email);
export const dateValidator = (date) => (
  date instanceof Date
  && date.getDay()
  && date.getMonth()
  && date.getFullYear()
  && date < new Date()
  && (new Date().getFullYear() - date.getFullYear()) > 18
);

export const adressValidator = ({ city, street, house /* apartment */ }) => (
  textValidator(city) && textValidator(street) && parseInt(house, 10)
);

export const roleValidator = () => true;

export const userDataValidator = (userData) => (
  textValidator(userData.firstname)
  && textValidator(userData.surname)
  && emailValidator(userData.email)
  && roleValidator(userData.role)
  && adressValidator(userData.adress)
  && dateValidator(userData.birthDate)
);
