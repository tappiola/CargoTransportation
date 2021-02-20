/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { enqueueToast } from 'features/Notifier/NotifierSlice';

import * as api from 'api';
import { TOAST_TYPES } from 'constants/toastsTypes';

export const getWaybills = createAsyncThunk(
  'waybills/getWaybills',
  api.getWaybills,
);

export const deleteWaybills = createAsyncThunk(
  'waybills/deleteWaybills',
  async (ids, { dispatch }) => {
    await api.deleteWaybills(ids).catch((err) => {
      dispatch(enqueueToast({
        message: err.message || 'Ошибка при удалении путевого листа',
        type: TOAST_TYPES.ERROR,
      }));

      throw err;
    });

    dispatch(enqueueToast({
      message: 'Путевые листы успешно удалены',
      type: TOAST_TYPES.SUCCESS,
    }));

    return ids;
  },
);

export const updateWaybill = createAsyncThunk(
  'waybills/updateWaybill',
  async ({ id, data }, { dispatch }) => {
    await api.updateWaybill(id, data)
      .catch((err) => {
        dispatch(enqueueToast({
          message: err.message || 'Ошибка при обновлении путевого листа',
          type: TOAST_TYPES.ERROR,
        }));

        throw err;
      });

    dispatch(enqueueToast({
      message: 'Путевой лист успешно обновлен',
      type: TOAST_TYPES.SUCCESS,
    }));
  },
);

const initialState = {
  waybillsData: [],
  waybillsLoadComplete: false,
};

const waybillsSlice = createSlice({
  name: 'waybills',
  initialState,
  extraReducers: {
    [getWaybills.fulfilled]: (state, action) => {
      state.waybillsData = action.payload;
      state.waybillsLoadComplete = true;
    },
    [deleteWaybills.fulfilled]: (state, action) => {
      state.waybillsData = state.waybillsData
        .filter(({ id }) => !action.payload.includes(String(id)));
    },
  },
});

export default waybillsSlice.reducer;
