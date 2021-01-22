import { fetchAPI } from 'api/fetchAPI';

const BASE_URI = '/elastic';

export const getOptions = async (query) => fetchAPI(BASE_URI, query, 'POST');
