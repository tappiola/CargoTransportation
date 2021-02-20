import { yupResolver } from '@hookform/resolvers/yup';

import { yup } from 'utils';

const companySchema = yup.object().shape({
  name: yup.string().required().min(2),
  unn: yup.string().required().min(9),
});

export const companyResolver = yupResolver(companySchema);
