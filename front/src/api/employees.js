import { fetchAPI } from './fetchAPI';

const BASE_URI = '/employees';

export const getEmployees = async (companyId) => fetchAPI(`${BASE_URI}?companyId=${companyId}`);

export const deleteEmployees = async (ids) => fetchAPI(`${BASE_URI}?ids=${ids.join(',')}`, null, 'DELETE');
