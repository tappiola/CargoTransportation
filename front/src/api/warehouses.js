import { fetchAPI } from './fetchAPI';

const BASE_URI = '/warehouses';

export const getWarehouse = async (id) => fetchAPI(`${BASE_URI}/${id}`);
export const getWarehouses = async () => fetchAPI(BASE_URI);
export const setWarehouse = async (data) => fetchAPI(`${BASE_URI}/create`, data, 'POST');
export const updateWarehouse = async (data, warehouseId) => fetchAPI(`${BASE_URI}/${warehouseId}`, data, 'PUT');
export const deleteWarehouses = async (ids) => fetchAPI(BASE_URI, ids, 'DELETE');
