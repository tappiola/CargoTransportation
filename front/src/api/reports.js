import { fetchAPI } from 'api';

const BASE_URI = '/reports';

export const getReports = async () => fetchAPI(BASE_URI);
export const setReport = async (data) => fetchAPI(`${BASE_URI}/register`, data, 'POST');
export const updateReport = async (data, id) => fetchAPI(`${BASE_URI}/${id}`, data, 'PUT');
export const deleteReports = async (ids) => fetchAPI(BASE_URI, ids, 'DELETE');
