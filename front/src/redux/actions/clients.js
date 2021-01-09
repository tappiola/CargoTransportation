import * as actionTypes from './actionTypes';
import { deleteClients, getClients } from 'api';

export const setClients = (clientsData) => ({
  type: actionTypes.CLIENTS_SET,
  clientsData,
});

export const handleDeleteClients = (ids) => ({
  type: actionTypes.CLIENTS_DELETE,
  ids,
});

export const dispatchGetClients = () => (dispatch) => {
  // TODO: get companyId from user profile
  getClients(1)
    .then((data) => data.json())
    .then((data) => dispatch(setClients(data)));
};

export const dispatchDeleteClients = (ids) => (dispatch) => {
  deleteClients(ids)
    .then(() => dispatch(handleDeleteClients(ids)));
};
