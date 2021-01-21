import { fetchAPI } from 'api';

const BASE_URI = '/clients';

export const getClients = async (companyId) => fetchAPI(`${BASE_URI}?companyId=${companyId}`);
export const deleteClients = async (ids) => fetchAPI(`${BASE_URI}`, ids, 'DELETE');
export const updateClient = async ({ companyId, clientId, ...data }) => fetchAPI(`${BASE_URI}/${clientId}`, { ...data, companyId }, 'PUT');
export const setClient = async ({ companyId, ...data }) => fetchAPI(`${BASE_URI}/register`, { ...data, companyId }, 'POST');
