import { yupResolver } from '@hookform/resolvers/yup';

import { yup } from 'utils';

const warehouseSchema = yup.object().shape({
  name: yup.string().required().min(4).max(50),
  email: yup.string().required().email(),
  country: yup.string().required(),
  city: yup.string().required().min(4).max(50),
  street: yup.string().required().min(4).max(50),
  house: yup.string().required().min(1).max(50),
  isTrusted: yup.bool(),
});

export const warehouseResolver = yupResolver(warehouseSchema);
