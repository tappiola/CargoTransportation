/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
};

const notifierSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    enqueueToast(state, action) {
      state.notifications.push(action.payload);
    },
    processToast(state) {
      state.notifications.splice(0, 1);
    },
  },
});

export const { enqueueToast, processToast } = notifierSlice.actions;

export default notifierSlice.reducer;
