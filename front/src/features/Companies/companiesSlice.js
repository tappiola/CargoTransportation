/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { enqueueToast } from 'features/Notifier/NotifierSlice';

import * as api from 'api';
import { TOAST_TYPES } from 'constants/toastsTypes';

export const getCompanies = createAsyncThunk(
  'companies/getCompanies',
  api.getCompanies,
);

export const setCompany = createAsyncThunk(
  'company/setCompany',
  api.setCompany,
);

export const updateCompany = createAsyncThunk(
  'company/updateCompany',
  async ({ id, ...data }) => {
    await api.updateCompany(data, id);
  },
);

export const deleteCompanies = createAsyncThunk(
  'company/deleteCompanies',
  async (ids, { dispatch }) => {
    await api.deleteCompanies(ids)
      .catch((err) => {
        dispatch(enqueueToast({
          message: err.message || 'Oшибка при удалении компании',
          type: TOAST_TYPES.ERROR,
        }));

        throw err;
      });

    dispatch(enqueueToast({
      message: 'Удаление компании прошло успешно',
      type: TOAST_TYPES.SUCCESS,
    }));

    return ids;
  },
);

const initialState = {
  companiesData: [],
  companiesLoadComplete: false,
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  extraReducers: {
    [deleteCompanies.fulfilled]: (state, action) => {
      state.companiesData = state.companiesData
        .filter(({ id }) => !action.payload.includes(String(id)));
    },
    [getCompanies.fulfilled]: (state, action) => {
      state.companiesData = action.payload;
      state.companiesLoadComplete = true;
    },
    [setCompany.fulfilled]: (state, action) => {
      state.companiesData.push(action.payload);
    },
  },
});

export default companiesSlice.reducer;
