import { fetchAPI } from './fetchAPI';

const BASE_URI = '/consignment-notes';

export const getConsignmentNotes = async () => fetchAPI(BASE_URI);
export const getConsignmentNote = async (id) => fetchAPI(`${BASE_URI}/${id}`);
export const createConsignmentNote = async (data) => fetchAPI(`${BASE_URI}/create`, data, 'POST');
export const aproveConsignmentNote = async (id) => fetchAPI(BASE_URI, { id }, 'PUT');
export const deleteConsignmentNotes = async (ids) => fetchAPI(BASE_URI, ids, 'DELETE');
