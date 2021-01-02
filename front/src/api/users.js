import { BACKEND_HOST } from 'constants/environment';

export const getUsers = async () => fetch(`${BACKEND_HOST}/users`);

export const deleteUsers = async (ids) => fetch(`${BACKEND_HOST}/users?ids=${ids.join(',')}`, {
  method: 'DELETE',
});
