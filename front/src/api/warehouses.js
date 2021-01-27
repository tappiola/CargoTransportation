import { fetchAPI } from './fetchAPI';

const BASE_URI = '/warehouses';

export const getWarehouses = async () => fetchAPI(BASE_URI);
export const deleteWarehouses = async (ids) => fetchAPI(`${BASE_URI}`, ids, 'DELETE');
