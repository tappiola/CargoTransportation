/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { enqueueToast } from './notifications';
import * as api from 'api';
import { TOAST_TYPES } from 'constants/toastsTypes';

const initialState = {
  warehousesData: [],
  warehousesLoadComplete: false,
};

const warehousesSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setWarehouses(state, action) {
      state.warehousesData = action.payload;
      state.warehousesLoadComplete = true;
    },
    deleteWarehouses: {
      reducer: (state, action) => {
        state.clientsData = state.clientsData
          .filter(({ id }) => !action.payload.includes(String(id)));
      },
    },
  },
});

export const { setWarehouses, deleteWarehouses } = warehousesSlice.actions;

export default warehousesSlice.reducer;

export const dispatchGetWarehouses = () => (dispatch) => {
  api.getWarehouses().then((data) => dispatch(setWarehouses(data)));
};

export const dispatchDeleteWarehouses = (ids) => (dispatch) => (
  api.deleteWarehouses(ids)
    .then(() => {
      dispatch(deleteWarehouses(ids));
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
