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
});

export const schema = yup.object().shape({
  firstName: yup.string().required().min(4).max(50),
  middleName: yup.string().min(4).max(50),
  lastName: yup.string().required().min(4).max(50),
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(8)
    .max(15)
    .matches(
      /[a-zA-Z0-9]/,
      'Пароль должен содержать только латинские буквы и цифры',
    ),
  city: yup.string().required(),
  street: yup.string().required(),
  house: yup.string().required(),
  apartment: yup.string(),
  birthdate: yup.date().max(new Date()),
  roles: yup
    .object()
    .test((obj) => Object.values(obj).some((isChecked) => isChecked))
    .required(),
});
