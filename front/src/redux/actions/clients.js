import * as actionTypes from './actionTypes';
import * as api from 'api';

export const setClients = (clientsData) => ({
  type: actionTypes.CLIENTS_SET,
  clientsData,
});

export const handleDeleteClients = (ids) => ({
  type: actionTypes.CLIENTS_DELETE,
  ids,
});

export const dispatchGetClients = () => (dispatch) => (
  api.getClients()
    .then((data) => dispatch(setClients(data)))
);

export const dispatchDeleteClients = (ids) => (dispatch) => (
  api.deleteClients(ids)
    .then(() => dispatch(handleDeleteClients(ids)))
);

export const dispatchUpdateClient = (clientId, data) => () => (
  api.updateClient(clientId, data)
);

export const dispatchSetClient = (data) => () => (
  api.setClient(data)
);
