import * as actionTypes from './actionTypes';
import * as api from 'api';

export const setWaybills = (waybillsData) => ({
  type: actionTypes.WAYBILLS_SET,
  waybillsData,
});

export const handleDeleteWaybills = (ids) => ({
  type: actionTypes.WAYBILLS_DELETE,
  ids,
});

export const dispatchGetWaybills = () => (dispatch) => {
  api.getWaybills().then((data) => dispatch(setWaybills(data)));
};

export const dispatchDeleteWaybills = (ids) => (dispatch) => {
  api.deleteWaybills(ids)
    .then(() => dispatch(handleDeleteWaybills(ids)));
};
