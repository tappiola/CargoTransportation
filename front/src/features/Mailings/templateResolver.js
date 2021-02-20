import { yupResolver } from '@hookform/resolvers/yup';

import { yup } from 'utils';

const templateSchema = yup.object().shape({
  user: yup.object({
    id: yup.number().required(),
  }),
  birthday: yup.date().max(new Date()).typeError(),
  text: yup.string().required().min(4).max(255),
  image: yup.string().required(),
});

export const templateResolver = yupResolver(templateSchema);
