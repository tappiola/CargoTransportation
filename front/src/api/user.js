import { BACKEND_HOST } from 'constants/environment';

export const getUsers = async () => fetch(`${BACKEND_HOST}/users`);
