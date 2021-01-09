import * as actionTypes from './actionTypes';
import { deleteConsignmentNotes, getConsignmentNotes } from 'api';

export const setConsignmentNotes = (consignmentNotesData) => ({
  type: actionTypes.CONSIGNMENT_NOTES_SET,
  consignmentNotesData,
});

export const handleDeleteConsignmentNotes = (ids) => ({
  type: actionTypes.CONSIGNMENT_NOTES_DELETE,
  ids,
});

export const dispatchGetConsignmentNotes = () => (dispatch) => {
  // TODO: get companyId from token/cookie/session_data
  getConsignmentNotes(1)
    .then((data) => data.json())
    .then((data) => dispatch(setConsignmentNotes(data)));
};

export const dispatchDeleteConsignmentNotes = (ids) => (dispatch) => {
  deleteConsignmentNotes(ids)
    .then(() => dispatch(handleDeleteConsignmentNotes(ids)));
};
