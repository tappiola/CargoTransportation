/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from 'api';

export const getCompanies = createAsyncThunk(
  'users/getCompanies',
  api.getCompanies,
);

const initialState = {
  companiesData: [],
  companiesLoadComplete: false,
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  extraReducers: {
    [getCompanies.fulfilled]: (state, action) => {
      state.companiesData = action.payload;
    },
  },
});

export default companiesSlice.reducer;
