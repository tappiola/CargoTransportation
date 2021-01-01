import { BACKEND_HOST } from 'constants/environment';

export const getUsers = async () => fetch(`${BACKEND_HOST}/users`);
export const getEmployees = async (companyId) => fetch(`${BACKEND_HOST}/employees?companyId=${companyId}`);
