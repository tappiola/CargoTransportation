import { fetchAPI } from 'api';

const BASE_URI = '/companies';

export const getCompanies = async () => fetchAPI(BASE_URI);
