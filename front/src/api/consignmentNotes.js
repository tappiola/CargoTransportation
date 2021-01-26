import { fetchAPI } from './fetchAPI';

const BASE_URI = '/consignment-notes';

export const getConsignmentNotes = async () => fetchAPI(BASE_URI);
export const deleteConsignmentNotes = async (ids) => fetchAPI(`${BASE_URI}`, ids, 'DELETE');
export const createConsignmentNote = async (data) => fetchAPI(`${BASE_URI}/create`, data, 'POST');
