import { yupResolver } from '@hookform/resolvers/yup';

import { yup } from 'utils';

const vehiclesSchema = yup.object().shape({
  number: yup.string().required().min(5),
});

export const vehiclesResolver = yupResolver(vehiclesSchema);
