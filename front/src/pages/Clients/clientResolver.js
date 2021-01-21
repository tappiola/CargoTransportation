import { yupResolver } from '@hookform/resolvers/yup';

import { yup } from 'utils';

const clientSchema = yup.object().shape({
  firstName: yup.string().required().min(4).max(50),
  lastName: yup.string().required().min(4).max(50),
  middleName: yup.string().max(50),
  companyName: yup.string().required().min(4).max(50),
  email: yup.string().required().email(),
  birthday: yup.date().typeError(),
  country: yup.string().required(),
  city: yup.string().required().min(4).max(50),
  street: yup.string().required().min(4).max(50),
  house: yup.string().required().min(1).max(50),
  isActive: yup.bool(),
});

export const clientResolver = yupResolver(clientSchema);
