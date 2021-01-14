import { fetchAPI } from './fetchAPI';

const BASE_URI = '/employees';

export const getEmployees = async (companyId) => fetchAPI(`${BASE_URI}?companyId=${companyId}`);
export const deleteEmployees = async (ids) => fetchAPI(`${BASE_URI}?ids=${ids.join(',')}`, null, 'DELETE');
export const setEmployee = async ({ data, companyId }) => fetchAPI(`${BASE_URI}/register`, JSON.stringify({ ...data, companyId }), 'POST');
export const updateEmployee = async (data, id) => fetchAPI(`${BASE_URI}/${id}`, JSON.stringify(data), 'PUT');
