import { fetchAPI } from 'api';

const BASE_URI = '/companies';

export const getCompanies = async () => fetchAPI(BASE_URI);
export const setCompany = async (data) => fetchAPI(`${BASE_URI}/create`, data, 'POST');
export const updateCompany = async (data, id) => fetchAPI(`${BASE_URI}/${id}`, data, 'PUT');
export const deleteCompanies = async (ids) => fetchAPI(BASE_URI, ids, 'DELETE');
