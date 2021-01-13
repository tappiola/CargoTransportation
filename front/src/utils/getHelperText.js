export const getHelperText = ({ type, ref } = {}) => {
  if (!type) {
    return '';
  }
  switch (type) {
    case 'required':
      return 'Заполните это поле';
    case 'minLength':
      return 'длина меньше минимальной';
    case 'maxLength':
      return 'длина больше максимальной';
    case 'validate':
      return ref.type === 'password' ? 'Пароль должен содержать минимум 1 заглавную и строчную буквы и 1 цифру' : 'Некорректное значение';
    default:
      return 'Ошибка';
  }
};
