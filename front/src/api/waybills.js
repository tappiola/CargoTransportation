import { BACKEND_HOST } from 'constants/environment';

export const getWaybills = async (companyId) => fetch(`${BACKEND_HOST}/waybills?companyId=${companyId}`);

export const deleteWaybills = async (ids) => fetch(`${BACKEND_HOST}/waybills?ids=${ids.join(',')}`, {
  method: 'DELETE',
});
