export const textValidator = (str) => typeof str === 'string' && str.length > 2;

export const emailValidator = () => true; // already exist

export const dateValidator = (date) => (
  date instanceof Date
  && date.getDay()
  && date.getMonth()
  && date.getFullYear()
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
