/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import * as api from 'api';

const initialState = {
  waybillsData: [],
  waybillsLoadComplete: false,
};

const waybillsSlice = createSlice({
  name: 'waybills',
  initialState,
  reducers: {
    setWaybills(state, action) {
      state.waybillsData = action.payload;
      state.waybillsLoadComplete = true;
    },
    deleteWaybills: {
      reducer: (state, action) => {
        state.waybillsData = state.waybillsData
          .filter(({ id }) => !action.payload.includes(String(id)));
      },
    },
  },
});

export const { setWaybills, deleteWaybills } = waybillsSlice.actions;

export default waybillsSlice.reducer;

export const dispatchGetWaybills = () => (dispatch) => (
  api.getWaybills()
    .then((data) => dispatch(setWaybills(data)))
);

export const dispatchDeleteWaybills = (ids) => (dispatch) => (
  api.deleteWaybills(ids)
    .then(() => dispatch(deleteWaybills(ids)))
);
