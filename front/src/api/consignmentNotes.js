import { fetchAPI } from './fetchAPI';

const BASE_URI = '/consignment-notes';

export const getConsignmentNotes = async (companyId) => fetchAPI(`${BASE_URI}?companyId=${companyId}`);
export const deleteConsignmentNotes = async (ids) => fetchAPI(`${BASE_URI}`, ids, 'DELETE');
export const createConsignmentNote = async (data) => fetchAPI(`${BASE_URI}/create`, data, 'POST');
