import { BACKEND_HOST } from 'constants/environment';

export const getEmployees = async (companyId) => fetch(`${BACKEND_HOST}/employees?companyId=${companyId}`);

export const deleteEmployees = async (ids) => fetch(`${BACKEND_HOST}/employees?ids=${ids.join(',')}`, {
  method: 'DELETE',
});
