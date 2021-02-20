import { fetchAPI } from './fetchAPI';

const BASE_URI = '/waybills';

export const getWaybill = async (id) => fetchAPI(`${BASE_URI}/${id}`);
export const getWaybills = async () => fetchAPI(BASE_URI);
export const precreateWaybill = async (data) => fetchAPI(BASE_URI, data, 'POST');
export const updateWaybill = async (id, data) => fetchAPI(`${BASE_URI}/${id}`, data, 'PUT');
export const deleteWaybills = async (ids) => fetchAPI(BASE_URI, ids, 'DELETE');
