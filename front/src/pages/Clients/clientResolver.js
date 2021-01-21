import { yupResolver } from '@hookform/resolvers/yup';

import { yup } from 'utils';

const clientSchema = yup.object().shape({
  firstName: yup.string().required().min(4).max(50),
  lastName: yup.string().required().min(4).max(50),
  middleName: yup.string().min(4).max(50),
  companyName: yup.string(),
  email: yup.string().required().email(),
  birthday: yup.date().max(new Date()),
  country: yup.string(),
  city: yup.string(),
  street: yup.string(),
  house: yup.string(),
  isActive: yup.bool(),
});

export const clientResolver = yupResolver(clientSchema);
