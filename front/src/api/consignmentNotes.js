import { BACKEND_HOST } from 'constants/environment';

export const getConsignmentNotes = async (companyId) => fetch(`${BACKEND_HOST}/consignment-notes?companyId=${companyId}`);

export const deleteConsignmentNotes = async (ids) => fetch(`${BACKEND_HOST}/consignment-notes?ids=${ids.join(',')}`, {
  method: 'DELETE',
});
