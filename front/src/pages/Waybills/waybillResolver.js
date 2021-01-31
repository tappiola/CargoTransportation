import { yupResolver } from '@hookform/resolvers/yup';

import { yup } from 'utils';

const waybillSchema = yup.object().shape({
  consignmentNote: yup.object().shape({
    number: yup.number().required(),
    issuedDate: yup.date().required(),
  }),
  waybill: yup.object().shape({
    number: yup.number().required(),
    issuedDate: yup.date().required(),
  }),
  vehicle: yup.object().shape({
    number: yup.string().required(),
    driver: yup.string().required(),
  }),
  client: yup.object().shape({
    shortFullName: yup.string().required(),
    fullAddress: yup.string().required(),
    departedAt: yup.date().required(),
  }),
  warehouse: yup.object().shape({
    name: yup.string().required(),
    fullAddress: yup.string().required(),
    expectedArrivalAt: yup.date().required(),
  }),
  points: yup.array().of(yup.object({
    name: yup.string().required(),
    date: yup.date().required(),
  })),
});

export const waybillResolver = yupResolver(waybillSchema);
