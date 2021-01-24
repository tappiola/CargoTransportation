import { fetchAPI } from 'api/fetchAPI';

const BASE_URI = '/employees';

export const getEmployees = async (companyId) => fetchAPI(`${BASE_URI}?companyId=${companyId}`);

export const getEmployeesWithRole = async (roleCode, companyId = 1) => fetchAPI(`${BASE_URI}?companyId=${companyId}&roleCode=${roleCode}`);

export const deleteEmployees = async (ids) => fetchAPI(`${BASE_URI}`, ids, 'DELETE');

export const setEmployee = async ({ data, companyId }) => fetchAPI(`${BASE_URI}/register`, { ...data, companyId }, 'POST');

export const updateEmployee = async (data, id) => fetchAPI(`${BASE_URI}/${id}`, data, 'PUT');
