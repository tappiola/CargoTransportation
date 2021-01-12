import { fetchAPI } from 'api';

export const setUser = async ({ data }) => fetchAPI('/users/register', JSON.stringify(data), 'POST');
export const getAllUsers = async () => fetchAPI('/users');
export const updateUser = async (data, id) => fetchAPI(`/users/${id}`, JSON.stringify(data), 'PUT');
export const signIn = async (email, password) => fetchAPI('users/login', JSON.stringify({ email, password }), 'POST');
