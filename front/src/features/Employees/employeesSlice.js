/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { enqueueToast } from 'features/Notifier/NotifierSlice';

import * as api from 'api';
import { TOAST_TYPES } from 'constants/toastsTypes';

export const getEmployees = createAsyncThunk(
  'employees/getEmployees',
  api.getEmployees,
);

export const setEmployee = createAsyncThunk(
  'employees/setEmployee',
  api.setEmployee,
);

export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',
  async ({ id, ...data }) => {
    await api.updateEmployee(data, id);
  },
);

export const deleteEmployees = createAsyncThunk(
  'employees/deleteEmployees',
  async (ids, { dispatch }) => {
    await api.deleteEmployees(ids)
      .catch((err) => {
        dispatch(enqueueToast({
          message: err.message || 'Oшибка при удалении сотрудников',
          type: TOAST_TYPES.ERROR,
        }));

        throw err;
      });

    dispatch(enqueueToast({
      message: 'Удаление сотрудников прошло успешно',
      type: TOAST_TYPES.SUCCESS,
    }));

    return ids;
  },
);

const initialState = {
  employeesData: [],
  employeesLoadComplete: false,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  extraReducers: {
    [deleteEmployees.fulfilled]: (state, action) => {
      state.employeesData = state.employeesData
        .filter(({ id }) => !action.payload.includes(String(id)));
    },
    [getEmployees.fulfilled]: (state, action) => {
      state.employeesData = action.payload;
      state.employeesLoadComplete = true;
    },
  },
});

export default employeesSlice.reducer;
