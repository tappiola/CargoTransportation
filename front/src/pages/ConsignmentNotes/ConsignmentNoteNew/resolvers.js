import {yupResolver} from '@hookform/resolvers/yup';

import {yup} from 'utils';

const consignmentNoteSchema = yup.object().shape({
  // consignmentNoteNumber:
  //   yup.number().required()
  //     .typeError('Номер ТТН должен быть числом')
  //     .positive().integer(),
  // passportNumber: yup.string().required().min(6).max(20),
  // passportIssuedAt: yup.date().typeError('Невалидная дата').max(new Date()),
  // manager: yup.object({fullName: yup.string().required()}),
  // driver: yup.object({fullName: yup.string().required()}),
  // client: yup.object({fullName: yup.string().required()}),
  // passportIssuedBy: yup.string().required().min(6).max(50),
  // vehicle: yup.string().required().min(5).max(30),
});

const productSchema = yup.object().shape({
  name: yup.string().required().min(3).max(30),
})

export const consignmentNoteResolver = yupResolver(consignmentNoteSchema);
export const productResolver = yupResolver(productSchema);
