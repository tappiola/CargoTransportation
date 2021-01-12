import { fetchAPI } from 'api';

const BASE_URI = '/users';

export const getUsers = async () => fetchAPI('/users');
export const deleteUsers = async (ids) => fetchAPI(`${BASE_URI}?ids=${ids.join(',')}`, null, 'DELETE');
export const setUser = async ({ data }) => fetchAPI(`${BASE_URI}/register`, JSON.stringify(data), 'POST');
export const updateUser = async (data, id) => fetchAPI(`${BASE_URI}/${id}`, JSON.stringify(data), 'PUT');
export const signIn = async (email, password) => fetchAPI(`${BASE_URI}/login`, JSON.stringify({ email, password }), 'POST');
