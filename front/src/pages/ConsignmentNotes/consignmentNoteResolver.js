import {yupResolver} from '@hookform/resolvers/yup';

import {yup} from 'utils';

import {isDate, parse} from "date-fns";

function parseDateString(value, originalValue) {
  return isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());
}

const consignmentNoteSchema = yup.object().shape({
  // firstName: yup.string().required().min(4).max(50),
  // middleName: yup.string().required().min(4).max(50),
  // lastName: yup.string().required().min(4).max(50),
  consignmentNoteNumber: yup.string().required().min(6).max(12),
  passportNumber: yup.string().required().min(6).max(20),
  // issuedDate: yup.date().transform(parseDateString).required().max(new Date()),
  issuedDate: yup.date().required().max(new Date()),
  passportIssuedAt: yup.date().required().max(new Date()),
  driverName: yup.object({fullName: yup.string().required()}),
  clientName: yup.object({fullName: yup.string().required()}),
  passportIssuedBy: yup.string().required().min(6).max(50),
});

export const consignmentNoteResolver = yupResolver(consignmentNoteSchema);
