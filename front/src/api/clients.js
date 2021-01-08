import { BACKEND_HOST } from 'constants/environment';

export const getClients = async (companyId) => fetch(`${BACKEND_HOST}/clients?companyId=${companyId}`);

export const deleteClients = async (ids) => fetch(`${BACKEND_HOST}/clients?ids=${ids.join(',')}`, {
  method: 'DELETE',
});
