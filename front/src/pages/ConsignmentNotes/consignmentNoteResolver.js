import { yupResolver } from '@hookform/resolvers/yup';

import { yup } from 'utils';

const employeeSchema = yup.object().shape({
  firstName: yup.string().required().min(4).max(50),
  middleName: yup.string().min(4).max(50),
  lastName: yup.string().required().min(4).max(50),
  email: yup.string().required().email(),
  country: yup.string().required(),
  city: yup.string().required(),
  street: yup.string().required(),
  house: yup.string().required(),
  apartment: yup.string().nullable(),
  birthdate: yup.date().max(new Date()),
  roles: yup
    .object()
    .test((obj) => Object.values(obj).some((isChecked) => isChecked))
    .required(),
});

export const employeeResolver = yupResolver(employeeSchema);
