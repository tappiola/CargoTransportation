import { BACKEND_HOST } from '../constants/environment';

export const getUsersApi = async () => fetch(`${BACKEND_HOST}/users`);
