import { fetchAPI } from 'api';

const BASE_URI = '/elastic';

export const getOptions = async (query) => fetchAPI(BASE_URI, query, 'POST');
