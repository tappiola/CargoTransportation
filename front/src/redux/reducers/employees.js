/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { enqueueToast } from './notifications';
import * as api from 'api';
import { TOAST_TYPES } from 'constants/toastsTypes';

const initialState = {
  employeesData: [],
  employeesLoadComplete: false,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees(state, action) {
      state.employeesData = action.payload;
      state.employeesLoadComplete = true;
    },
    deleteEmployees: {
      reducer: (state, action) => {
        state.employeesData = state.employeesData
          .filter(({ id }) => !action.payload.includes(String(id)));
      },
    },
  },
});

export const { setEmployees, deleteEmployees } = employeesSlice.actions;

export default employeesSlice.reducer;

export const dispatchGetEmployees = () => (dispatch) => (
  api.getEmployees()
    .then((data) => dispatch(setEmployees(data)))
);

export const dispatchDeleteEmployees = (ids) => (dispatch) => (
  api.deleteEmployees(ids)
    .then(() => {
      dispatch(deleteEmployees(ids));
      dispatch(enqueueToast({ message: 'Удаление сотрудников прошло успешно', type: TOAST_TYPES.SUCCESS }));
    })
);

export const dispatchSetEmployee = (data) => () => (
  api.setEmployee(data)
);

export const dispatchUpdateEmployee = ({ id, ...data }) => () => (
  api.updateEmployee(data, id)
);
