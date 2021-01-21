import * as actionTypes from './actionTypes';
import * as api from 'api';
import {enqueueToast} from "./notifications";

export const setConsignmentNotes = (consignmentNotesData) => ({
  type: actionTypes.CONSIGNMENT_NOTES_SET,
  consignmentNotesData,
});

export const handleDeleteConsignmentNotes = (ids) => ({
  type: actionTypes.CONSIGNMENT_NOTES_DELETE,
  ids,
});

export const handleCreateConsignmentNote = (data) => ({
  type: actionTypes.CONSIGNMENT_NOTES_DELETE,
  data,
});

export const dispatchGetConsignmentNotes = () => (dispatch) => {
  // TODO: get companyId from token/cookie/session_data
  api.getConsignmentNotes(1).then((data) => dispatch(setConsignmentNotes(data)));
};

export const dispatchDeleteConsignmentNotes = (ids) => (dispatch) => {
  api.deleteConsignmentNotes(ids)
    .then(() => dispatch(handleDeleteConsignmentNotes(ids)));
};

export const dispatchCreateConsignmentNote = (data) => (dispatch) => {
  api.createConsignmentNote(data)
    .then(
      () => dispatch(handleCreateConsignmentNote(data)))
};
