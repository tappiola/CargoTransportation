import { fetchAPI } from 'api/fetchAPI';

const BASE_URI = '/employees';

export const getEmployees = async () => fetchAPI(BASE_URI);
export const getEmployeesWithRole = async (role) => fetchAPI(`${BASE_URI}?role=${role}`);
export const deleteEmployees = async (ids) => fetchAPI(BASE_URI, ids, 'DELETE');
export const setEmployee = async (data) => fetchAPI(`${BASE_URI}/register`, data, 'POST');
export const updateEmployee = async (data, id) => fetchAPI(`${BASE_URI}/${id}`, data, 'PUT');
