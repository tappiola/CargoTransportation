import { fetchAPI } from './fetchAPI';

const BASE_URI = '/documents';

export const getDocuments = async (id) => fetchAPI(`${BASE_URI}/${id}`);
