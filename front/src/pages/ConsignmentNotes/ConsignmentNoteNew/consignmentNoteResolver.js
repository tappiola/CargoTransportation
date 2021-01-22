import {yupResolver} from '@hookform/resolvers/yup';

import {yup} from 'utils';

import {isDate, parse} from "date-fns";

function parseDateString(value, originalValue) {
  return isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());
}

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
});

export const consignmentNoteResolver = yupResolver(consignmentNoteSchema);
