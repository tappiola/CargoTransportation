import { fetchAPI } from 'api';

export const setUser = async ({ id, data }) => fetchAPI(`/api/users/${id}`, JSON.stringify(data));
