import * as actionTypes from './actionTypes';
import { deleteWaybills, getWaybills } from 'api';

export const setWaybills = (waybillsData) => ({
  type: actionTypes.WAYBILLS_SET,
  waybillsData,
});

export const handleDeleteWaybills = (ids) => ({
  type: actionTypes.WAYBILLS_DELETE,
  ids,
});

export const dispatchGetWaybills = () => (dispatch) => {
  // TODO: get companyId from token/cookie/session_data
  getWaybills(1)
    .then((data) => data.json())
    .then((data) => dispatch(setWaybills(data)));
};

export const dispatchDeleteWaybills = (ids) => (dispatch) => {
  deleteWaybills(ids)
    .then(() => dispatch(handleDeleteWaybills(ids)));
};
