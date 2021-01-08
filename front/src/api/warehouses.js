import { BACKEND_HOST } from 'constants/environment';

export const getWarehouses = async (companyId) => fetch(`${BACKEND_HOST}/warehouses?companyId=${companyId}`);

export const deleteWarehouses = async (ids) => fetch(`${BACKEND_HOST}/warehouses?ids=${ids.join(',')}`, {
  method: 'DELETE',
});
