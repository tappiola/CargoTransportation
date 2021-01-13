import { fetchAPI } from './fetchAPI';

const BASE_URI = '/waybills';

export const getWaybills = async (companyId) => fetchAPI(`${BASE_URI}?companyId=${companyId}`);

export const deleteWaybills = async (ids) => fetchAPI(`${BASE_URI}?ids=${ids.join(',')}`, null, 'DELETE');
