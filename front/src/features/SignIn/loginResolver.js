import { yupResolver } from '@hookform/resolvers/yup';

import { yup } from 'utils';

const loginSchema = yup.object().shape({
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
});

export const loginResolver = yupResolver(loginSchema);
