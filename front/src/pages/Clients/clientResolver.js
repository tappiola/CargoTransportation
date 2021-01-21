import { yupResolver } from '@hookform/resolvers/yup';

import { yup } from 'utils';

const clientSchema = yup.object().shape({
  firstName: yup.string().required().min(4).max(50),
  lastName: yup.string().required().min(4).max(50),
  middleName: yup.string().min(4).max(50),
  companyName: yup.string(),
  email: yup.string().required().email(),
  birthday: yup.date().max(new Date()),
  country: yup.string().nullable(),
  city: yup.string().nullable(),
  street: yup.string().nullable(),
  house: yup.string().nullable(),
  isActive: yup.bool(),
});

export const clientResolver = yupResolver(clientSchema);
