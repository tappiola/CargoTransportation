import { fetchAPI } from './fetchAPI';

const BASE_URI = '/waybills';

export const getWaybills = async () => fetchAPI(BASE_URI);
export const deleteWaybills = async (ids) => fetchAPI(`${BASE_URI}`, ids, 'DELETE');
export const updateWaybill = async (id, data) => fetchAPI(`${BASE_URI}/${id}`, data, 'PUT');
export const getWaybill = async (id) => fetchAPI(`${BASE_URI}/${id}`);
