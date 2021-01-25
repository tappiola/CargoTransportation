import { yupResolver } from '@hookform/resolvers/yup';

import { yup } from 'utils';

// Type error localization doesn't work
const INVALID_NUMBER = 'Введите число';

const consignmentNoteSchema = yup.object().shape({
  consignmentNoteNumber:
    yup.number().required()
      .typeError('Номер ТТН должен быть числом')
      .positive()
      .integer(),
  passportNumber: yup.string().required().min(6).max(20),
  passportIssuedAt: yup.date().typeError().max(new Date()),
  manager: yup.object({ fullName: yup.string().required() }),
  driver: yup.object({ fullName: yup.string().required() }),
  client: yup.object({ fullName: yup.string().required() }),
  passportIssuedBy: yup.string().required().min(6).max(50),
  vehicle: yup.string().required().min(5).max(30),
  goodsRows: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      unit: yup.string().required(),
      quantity: yup.number()
        .required()
        .typeError(INVALID_NUMBER)
        .min(1)
        .integer(),
      cost: yup.number()
        .required()
        .typeError(INVALID_NUMBER)
        .positive(),
      weight: yup.number()
        .required()
        .typeError(INVALID_NUMBER)
        .positive(),
    }),
  ),
  goods: yup.array().required().min(1, 'Добавьте хотя бы одну товарную позицию'),
});

export const consignmentNoteResolver = yupResolver(consignmentNoteSchema);
