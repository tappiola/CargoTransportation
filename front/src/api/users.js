import { fetchAPI } from 'api';

const BASE_URI = '/users';

export const getUsers = async () => fetchAPI(BASE_URI);
export const deleteUsers = async (ids) => fetchAPI(`${BASE_URI}`, ids, 'DELETE');
export const setUser = async (data) => fetchAPI(`${BASE_URI}/register`, data, 'POST');
export const updateUser = async (data, id) => fetchAPI(`${BASE_URI}/${id}`, data, 'PUT');
export const signIn = async (email, password) => fetchAPI(`${BASE_URI}/login`, { email, password }, 'POST');
export const updateToken = async () => fetchAPI(`${BASE_URI}/update-token`, null, 'POST');
export const logoutUser = async () => fetchAPI(`${BASE_URI}/logout`, null);
