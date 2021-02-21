/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { enqueueToast } from 'features/Notifier/NotifierSlice';

import * as api from 'api';
import { TOAST_TYPES } from 'constants/toastsTypes';

export const getVehicles = createAsyncThunk(
  'vehicles/getVehicles',
  api.getVehicles,
);

export const setVehicles = createAsyncThunk(
  'vehicles/setVehicles',
  api.setVehicles,
);

export const updateVehicles = createAsyncThunk(
  'vehicles/updateVehicles',
  async ({ id, ...data }) => {
    await api.updateVehicles(data, id);
  },
);

export const deleteVehicles = createAsyncThunk(
  'vehicles/deleteVehicles',
  async (ids, { dispatch }) => {
    await api.deleteVehicles(ids)
      .catch((err) => {
        dispatch(enqueueToast({
          message: err.message || 'Oшибка при удалении машины',
          type: TOAST_TYPES.ERROR,
        }));

        throw err;
      });

    dispatch(enqueueToast({
      message: 'Удаление машины прошло успешно',
      type: TOAST_TYPES.SUCCESS,
    }));

    return ids;
  },
);

const initialState = {
  vehiclesData: [],
  vehiclesLoadComplete: false,
};

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  extraReducers: {
    [deleteVehicles.fulfilled]: (state, action) => {
      state.vehiclesData = state.vehiclesData
        .filter(({ id }) => !action.payload.includes(String(id)));
    },
    [getVehicles.fulfilled]: (state, action) => {
      state.vehiclesData = action.payload;
      state.vehiclesLoadComplete = true;
    },
    [setVehicles.fulfilled]: (state, action) => {
      state.vehiclesData.push(action.payload);
    },
  },
});

export default vehiclesSlice.reducer;
