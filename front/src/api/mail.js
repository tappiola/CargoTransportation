import { fetchAPI } from 'api';

const BASE_URI = '/mails';

export const getTemplate = async (userId) => fetchAPI(`${BASE_URI}/${userId}`);
export const setTemplate = async (formData) => fetchAPI(BASE_URI, formData, 'POST');
