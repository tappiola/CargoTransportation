import { fetchAPI } from 'api/fetchAPI';

const BASE_URI = '/elastic';

export const getResults = async (q) => fetchAPI(`${BASE_URI}?firstName=${q}`);
