import { fetchAPI } from 'api';

const BASE_URI = '/clients';

export const getClients = async (companyId) => fetchAPI(`${BASE_URI}?companyId=${companyId}`);

export const deleteClients = async (ids) => fetchAPI(`${BASE_URI}?ids=${ids.join(',')}`, null, 'DELETE');
