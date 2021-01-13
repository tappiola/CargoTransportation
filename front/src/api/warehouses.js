import { fetchAPI } from './fetchAPI';

const BASE_URI = '/warehouses';

export const getWarehouses = async (companyId) => fetchAPI(`${BASE_URI}?companyId=${companyId}`);

export const deleteWarehouses = async (ids) => fetchAPI(`${BASE_URI}?ids=${ids.join(',')}`, null, 'DELETE');
