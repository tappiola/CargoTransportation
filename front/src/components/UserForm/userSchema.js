import * as yup from 'yup';

const MESSAGES = {
  minLength: (len) => `Минимальная длина: ${len} символа(ов)`,
  maxLength: (len) => `Максимальная длина: ${len} символа(ов)`,
  required: 'Заполните поле',
};

export const schema = yup.object().shape({
  firstName: yup.string().required(MESSAGES.required),
  middleName: yup
    .string()
    .min(4, MESSAGES.minLength(4))
    .required(MESSAGES.required),
  lastName: yup.string().required(MESSAGES.required),
  email: yup.string().required(MESSAGES.required),
  password: yup
    .string()
    .min(8, MESSAGES.minLength(8))
    .max(15, MESSAGES.maxLength(15))
    .required(MESSAGES.required),
  // eslint-disable-next-line react/forbid-prop-types
  address: yup.object().shape({
    city: yup.string().required(MESSAGES.required),
    street: yup.string().required(MESSAGES.required),
    house: yup.string().required(MESSAGES.required),
    apartment: yup.number(),
  }),
  birthdate: yup.date(),
  roles: yup.object().required(MESSAGES.required),
});
