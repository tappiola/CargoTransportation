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
  number: {
    typeError: 'Введите число',
    min: 'Минимальное значение: ${min}',
    positive: 'Введите значение > 0',
    integer: 'Введите целое число',
  },
  date: {
    max: 'Дата превышает максимальное значение',
    typeError: 'Некорректная дата',
  },
  object: {
    string: {
      required: 'Обязательное поле',
    },
  },
});

export { yup };
