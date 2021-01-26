import { fetchAPI } from './fetchAPI';

const BASE_URI = '/waybills';

export const getWaybills = async () => fetchAPI(BASE_URI);
export const deleteWaybills = async (ids) => fetchAPI(`${BASE_URI}`, ids, 'DELETE');
