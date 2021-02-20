/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { enqueueToast } from 'features/Notifier/NotifierSlice';

import * as api from 'api';
import { TOAST_TYPES } from 'constants/toastsTypes';

export const getReports = createAsyncThunk(
  'reports/getReports',
  api.getReports,
);

export const deleteReports = createAsyncThunk(
  'reports/deleteReports',
  async (ids, { dispatch }) => {
    await api.deleteReports(ids)
      .catch((err) => {
        dispatch(enqueueToast({
          message: err.message || 'Ошибка при удалении актов',
          type: TOAST_TYPES.ERROR,
        }));

        throw err;
      });

    dispatch(enqueueToast({
      message: 'Акты были успешно удалены',
      type: TOAST_TYPES.SUCCESS,
    }));

    return ids;
  },
);

export const updateReport = createAsyncThunk(
  'reports/updateReport',
  async ({ formData, reportId }, { dispatch }) => {
    await api.updateReport(formData, reportId)
      .catch((err) => {
        dispatch(enqueueToast({
          message: err.message || 'Ошибка при обновлении акта',
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

export const setReport = createAsyncThunk(
  'reports/setReport',
  async ({ formData }, { dispatch }) => {
    const response = await api.setReport(formData)
      .catch((err) => {
        dispatch(enqueueToast({
          message: err.message || 'Ошибка при создании акта',
          type: TOAST_TYPES.ERROR,
        }));

        throw err;
      });

    dispatch(enqueueToast({
      message: 'Клиент успешно добавлен',
      type: TOAST_TYPES.SUCCESS,
    }));

    return response;
  },
);

const initialState = {
  reportsData: [],
  reportsLoadComplete: false,
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  extraReducers: {
    [getReports.fulfilled]: (state, action) => {
      state.reportsData = action.payload;
      state.reportsLoadComplete = true;
    },
    [deleteReports.fulfilled]: (state, action) => {
      state.reportsData = state.reportsData
        .filter(({ id }) => !action.payload.includes(String(id)));
    },
    [setReport.fulfilled]: (state, action) => {
      state.reportsData.push(action.payload);
    },
  },
});

export default reportsSlice.reducer;
