import { fetchAPI } from 'api';

const BASE_URI = '/vehicles';

export const getVehicles = async () => fetchAPI(BASE_URI);
export const setVehicles = async (data) => fetchAPI(`${BASE_URI}/create`, data, 'POST');
export const updateVehicles = async (data, id) => fetchAPI(`${BASE_URI}/${id}`, data, 'PUT');
export const deleteVehicles = async (ids) => fetchAPI(BASE_URI, ids, 'DELETE');
