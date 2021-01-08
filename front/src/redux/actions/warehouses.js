import * as actionTypes from './actionTypes';
import { deleteWarehouses, getWarehouses } from '../../api';

export const setWarehouses = (warehousesData) => ({
  type: actionTypes.WAREHOUSES_SET,
  warehousesData,
});

export const handleDeleteWarehouses = (ids) => ({
  type: actionTypes.WAREHOUSES_DELETE,
  ids,
});

export const dispatchGetWarehouses = () => (dispatch) => {
  // TODO: get companyId from user profile
  getWarehouses(1)
    .then((data) => data.json())
    .then((data) => dispatch(setWarehouses(data)));
};

export const dispatchDeleteWarehouses = (ids) => (dispatch) => {
  deleteWarehouses(ids)
    .then(() => dispatch(handleDeleteWarehouses(ids)));
};
