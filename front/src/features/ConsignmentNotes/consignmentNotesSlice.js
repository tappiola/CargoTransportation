/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { enqueueToast } from 'features/Notifier/NotifierSlice';

import * as api from 'api';
import { TOAST_TYPES } from 'constants/toastsTypes';

const initialState = {
  consignmentNotesData: [],
  consignmentNotesLoadComplete: false,
};

export const getConsignmentNotes = createAsyncThunk(
  'consignmentNotes/getConsignmentNotes',
  api.getConsignmentNotes,
);

export const deleteConsignmentNotes = createAsyncThunk(
  'consignmentNotes/deleteConsignmentNotes',
  async (ids, { dispatch }) => {
    const response = await api.deleteConsignmentNotes(ids)
      .catch((err) => {
        dispatch(enqueueToast({
          message: err.message || 'Error',
          type: TOAST_TYPES.ERROR,
        }));
      });

    dispatch(enqueueToast({
      message: 'ТТН были успешно удалены',
      type: TOAST_TYPES.SUCCESS,
    }));

    return response;
  },
);

export const setConsignmentNote = createAsyncThunk(
  'consignmentNotes/setConsignmentNotes',
  async (data, { dispatch }) => {
    const response = await api.createConsignmentNote(data)
      .catch((err) => {
        dispatch(enqueueToast({
          message: err.message || 'Ошибка при создании ТТН',
          type: TOAST_TYPES.ERROR,
        }));
      });

    dispatch(enqueueToast({
      message: `ТТН ${response.consignmentNote} успешно зарегистрирована`,
      type: TOAST_TYPES.SUCCESS,
    }));

    return response;
  },
);

const consignmentNoteSlice = createSlice({
  name: 'consignmentNotes',
  initialState,
  extraReducers: {
    [getConsignmentNotes.fulfilled]: (state, action) => {
      state.consignmentNotesData = action.payload;
      state.consignmentNotesLoadComplete = true;
    },
    [deleteConsignmentNotes.fulfilled]: (state, action) => {
      state.consignmentNotesData = state.consignmentNotesData
        .filter(({ id }) => !action.payload.includes(String(id)));
    },
    [setConsignmentNote.fulfilled]: (state, action) => {
      state.consignmentNotesData.push(action.payload);
    },
  },
});

export default consignmentNoteSlice.reducer;
