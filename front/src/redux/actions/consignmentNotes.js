import * as actionTypes from './actionTypes';
import { enqueueToast } from './notifications';
import * as api from 'api';
import { TOAST_TYPES } from 'constants/toastsTypes';

export const setConsignmentNotes = (consignmentNotesData) => ({
  type: actionTypes.CONSIGNMENT_NOTES_SET,
  consignmentNotesData,
});

export const setConsignmentNote = ({ goods, consignmentNote }) => ({
  type: actionTypes.CONSIGNMENT_NOTES_SET_CURRENT,
  consignmentNote,
  goods,
});

export const handleDeleteConsignmentNotes = (ids) => ({
  type: actionTypes.CONSIGNMENT_NOTES_DELETE,
  ids,
});

export const dispatchGetConsignmentNotes = () => (dispatch) => (
  api.getConsignmentNotes().then((data) => dispatch(setConsignmentNotes(data)))
);

export const dispatchGetConsignmentNote = (id) => (dispatch) => (
  api.getConsignmentNote(id).then((data) => dispatch(setConsignmentNote(data)))
);

export const dispatchDeleteConsignmentNotes = (ids) => (dispatch) => (
  api.deleteConsignmentNotes(ids)
    .then(() => {
      dispatch(handleDeleteConsignmentNotes(ids));
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

export const dispatchConfirmConsigmentNote = (id) => async () => (
  api.aproveConsigmentNote(id)
);
