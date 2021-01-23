/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'Обязательное поле',
  },
  string: {
    email: 'Некорректный email',
    min: 'Минимальная длина: ${min} символов',
    max: 'Максимальная длина: ${max} символов',
  },
  date: {
    max: 'Некорректная дата',
  },
  object: {
    string: {
      required: 'Обязательное поле',
    },
  },
});

export { yup };
