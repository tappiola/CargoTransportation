import { fetchAPI } from 'api';

const BASE_URI = '/clients';

export const getClients = async () => fetchAPI(BASE_URI);
export const deleteClients = async (ids) => fetchAPI(BASE_URI, ids, 'DELETE');
export const updateClient = async (data, clientId) => fetchAPI(`${BASE_URI}/${clientId}`, data, 'PUT');
export const setClient = async (data) => fetchAPI(`${BASE_URI}/register`, data, 'POST');
