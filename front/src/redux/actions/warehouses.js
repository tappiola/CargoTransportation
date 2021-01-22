import * as actionTypes from './actionTypes';
import * as api from 'api';
import {enqueueToast} from "./notifications";
import {TOAST_TYPES} from "../../constants/toastsTypes";

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
  api.getWarehouses(1).then((data) => dispatch(setWarehouses(data)));
};

export const dispatchDeleteWarehouses = (ids) => (dispatch) => {
  api.deleteWarehouses(ids)
    .then(() => {
      dispatch(handleDeleteWarehouses(ids));
      dispatch(enqueueToast({message: 'Склады были успешно удалены', type: TOAST_TYPES.SUCCESS}))
    });
};
