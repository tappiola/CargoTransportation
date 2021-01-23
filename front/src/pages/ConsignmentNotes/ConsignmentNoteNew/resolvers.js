import {yupResolver} from '@hookform/resolvers/yup';

import {yup} from 'utils';

const consignmentNoteSchema = yup.object().shape({
  consignmentNoteNumber:
    yup.number().required()
      .typeError('Номер ТТН должен быть числом')
      .positive().integer(),
  passportNumber: yup.string().required().min(6).max(20),
  passportIssuedAt: yup.date().typeError('Невалидная дата').max(new Date()),
  manager: yup.object({fullName: yup.string().required()}),
  driver: yup.object({fullName: yup.string().required()}),
  client: yup.object({fullName: yup.string().required()}),
  passportIssuedBy: yup.string().required().min(6).max(50),
  vehicle: yup.string().required().min(5).max(30),
  goods: yup.array().of(yup.object().shape({
    name: yup.string().required('Проверьте, что для всех товарных позиций указано название'),
    quantity: yup.number().required('Проверьте, что для всех товарных позиций указано количество')
      .typeError('Количество должно быть числом')
      .positive('Количество должно быть положительным числом')
      .integer('Количество должно быть целым числом'),
    unit: yup.string().required('Проверьте, что для всех товарных позиций указана единица измерения'),
    cost: yup.number()
      .required('Проверьте, что для всех товарных позиций указана цена')
      .typeError('Цена должна быть числом')
      .positive('Цена должна положительным числом'),
  })).required().min(1, 'Добавьте хотя бы одну товарную позицию'),
});

export const consignmentNoteResolver = yupResolver(consignmentNoteSchema);
