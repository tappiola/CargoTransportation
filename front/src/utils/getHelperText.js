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
