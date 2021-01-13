import { fetchAPI } from './fetchAPI';

const BASE_URI = '/consignment-notes';

export const getConsignmentNotes = async (companyId) => fetchAPI(`${BASE_URI}?companyId=${companyId}`);

export const deleteConsignmentNotes = async (ids) => fetchAPI(`${BASE_URI}?ids=${ids.join(',')}`, null, 'DELETE');
