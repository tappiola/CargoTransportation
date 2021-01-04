const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}/;
export const emailRegExp = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/;
export const validatePassword = (password) => passwordRegExp.test(password);
export const validateEmail = (email) => emailRegExp.test(email);
export const textValidator = (str) => typeof str === 'string' && str.length > 2;
export const emailValidator = (email) => validateEmail(email);
export const validateDate = (date) => new Date().getFullYear() - date.getFullYear() > 18;
export const getHelperText = ({ type } = {}) => {
  if (!type) {
    return '';
  }
  switch (type) {
    case 'required':
      return 'Заполните это поле';
    case 'minLength':
      return 'Слишком коротко';
    case 'maxLength':
      return 'Слишком длинно';
    case 'min':
      return 'Некорректное значение';
    default:
      return 'Ошибка';
  }
};
