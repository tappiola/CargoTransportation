import * as actionTypes from './actionTypes';
import { enqueueToast } from './notifications';
import * as api from 'api';
import { TOAST_TYPES } from 'constants/toastsTypes';

export const setWarehouses = (warehousesData) => ({
  type: actionTypes.WAREHOUSES_SET,
  warehousesData,
});

export const handleDeleteWarehouses = (ids) => ({
  type: actionTypes.WAREHOUSES_DELETE,
  ids,
});

export const dispatchGetWarehouses = () => (dispatch) => {
  api.getWarehouses().then((data) => dispatch(setWarehouses(data)));
};

export const dispatchDeleteWarehouses = (ids) => (dispatch) => (
  api.deleteWarehouses(ids)
    .then(() => {
      dispatch(handleDeleteWarehouses(ids));
      dispatch(enqueueToast({ message: 'Склады были успешно удалены', type: TOAST_TYPES.SUCCESS }));
    })
);

export const dispatchUpdateWarehouse = (data, warehouseId) => (dispatch) => (
  api.updateWarehouse(data, warehouseId)
    .then(() => {
      dispatch(enqueueToast({ message: 'Изменения успешно сохранены', type: TOAST_TYPES.SUCCESS }));
    })
);

export const dispatchSetWarehouse = (data) => (dispatch) => (
  api.setWarehouse(data)
    .then(() => {
      dispatch(enqueueToast({ message: 'Склад успешно добавлен в систему', type: TOAST_TYPES.SUCCESS }));
    })
);
