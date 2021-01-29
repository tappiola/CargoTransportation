import { fetchAPI } from './fetchAPI';

const BASE_URI = '/waybills';

export const getWaybills = async () => fetchAPI(BASE_URI);
export const deleteWaybills = async (ids) => fetchAPI(BASE_URI, ids, 'DELETE');
export const precreateWaybill = async (data) => fetchAPI(BASE_URI, data, 'POST');
