/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { enqueueToast } from 'features/Notifier/NotifierSlice';

import * as api from 'api';
import { TOAST_TYPES } from 'constants/toastsTypes';

export const getWarehouses = createAsyncThunk(
  'warehouses/getWarehouses',
  api.getWarehouses,
);

export const setWarehouse = createAsyncThunk(
  'warehouses/setWarehouse',
  async (data, { dispatch }) => {
    api.setWarehouse(data)
      .catch((err) => {
        dispatch(enqueueToast({
          message: err.message || 'Ошибка при добавлении склада в систему',
          type: TOAST_TYPES.ERROR,
        }));

        throw err;
      });

    dispatch(enqueueToast({
      message: 'Склад успешно добавлен в систему',
      type: TOAST_TYPES.SUCCESS,
    }));

    return data;
  },
);

export const updateWarehouse = createAsyncThunk(
  'warehouses/updateWarehouse',
  async ({ id, ...data }, { dispatch }) => {
    await api.updateWarehouse(data, id)
      .catch((err) => {
        dispatch(enqueueToast({
          message: err.message || 'Изменения успешно сохранены',
          type: TOAST_TYPES.ERROR,
        }));

        throw err;
      });

    dispatch(enqueueToast({
      message: 'Изменения успешно сохранены',
      type: TOAST_TYPES.SUCCESS,
    }));
  },
);

export const deleteWarehouses = createAsyncThunk(
  'warehouses/deleteWarehouses',
  async (ids, { dispatch }) => {
    await api.deleteWarehouses(ids)
      .catch((err) => {
        dispatch(enqueueToast({
          message: err.message || 'Ошибка при создании склада',
          type: TOAST_TYPES.ERROR,
        }));

        throw err;
      });

    dispatch(enqueueToast({
      message: 'Склады были успешно удалены',
      type: TOAST_TYPES.SUCCESS,
    }));

    return ids;
  },
);

const initialState = {
  warehousesData: [],
  warehousesLoadComplete: false,
};

const warehousesSlice = createSlice({
  name: 'warehouses',
  initialState,
  extraReducers: {
    [getWarehouses.fulfilled]: (state, action) => {
      state.warehousesData = action.payload;
      state.warehousesLoadComplete = true;
    },
    [deleteWarehouses.fulfilled]: (state, action) => {
      state.warehousesData = state.warehousesData
        .filter(({ id }) => !action.payload.includes(String(id)));
    },
    [setWarehouse.fulfilled]: (state, action) => {
      state.warehoussData.push(action.payload);
    },
  },
});

export default warehousesSlice.reducer;
