/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { enqueueToast } from 'features/Notifier/NotifierSlice';

import * as api from 'api';
import { TOAST_TYPES } from 'constants/toastsTypes';

const initialState = {
  consignmentNotesData: [],
  consignmentNotesLoadComplete: false,
};

const consignmentNoteSlice = createSlice({
  name: 'consignmentNotes',
  initialState,
  reducers: {
    setConsignmentNotes(state, action) {
      state.consignmentNotesData = action.payload;
      state.consignmentNotesLoadComplete = true;
    },
    deleteConsignmentNotes: {
      reducer: (state, action) => {
        state.consignmentNotesData = state.consignmentNotesData
          .filter(({ id }) => !action.payload.includes(String(id)));
      },
    },
  },
});

export const { setConsignmentNotes, deleteConsignmentNotes } = consignmentNoteSlice.actions;

export default consignmentNoteSlice.reducer;

export const dispatchGetConsignmentNotes = () => (dispatch) => (
  api.getConsignmentNotes()
    .then((data) => dispatch(setConsignmentNotes(data)))
);

export const dispatchDeleteConsignmentNotes = (ids) => (dispatch) => (
  api.deleteConsignmentNotes(ids)
    .then(() => {
      dispatch(deleteConsignmentNotes(ids));
      dispatch(enqueueToast({ message: 'ТТН были успешно удалены', type: TOAST_TYPES.SUCCESS }));
    })
);

export const dispatchCreateConsignmentNote = (data) => (dispatch) => (
  api.createConsignmentNote(data)
    .then((createdNote) => {
      dispatch(enqueueToast({
        message: `ТТН ${createdNote.consignmentNote} успешно зарегистрирована`,
        type: TOAST_TYPES.SUCCESS,
      }));
    })
);
