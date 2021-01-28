import { fetchAPI } from './fetchAPI';

const BASE_URI = '/warehouses';

export const getWarehouses = async () => fetchAPI(BASE_URI);
export const deleteWarehouses = async (ids) => fetchAPI(`${BASE_URI}`, ids, 'DELETE');
export const updateWarehouse = async (data, warehouseId) => fetchAPI(`${BASE_URI}/${warehouseId}`, data, 'PUT');
export const setWarehouse = async (data) => fetchAPI(`${BASE_URI}/create`, data, 'POST');
