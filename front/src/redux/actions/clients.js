import * as actionTypes from './actionTypes';
import { enqueueToast } from './notifications';
import * as api from 'api';
import { TOAST_TYPES } from 'constants/toastsTypes';

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

export const dispatchDeleteClients = (ids) => (dispatch) => {
  api.deleteClients(ids)
    .then(() => {
      dispatch(handleDeleteClients(ids));
      dispatch(enqueueToast({ message: 'Клиенты были успешно удалены', type: TOAST_TYPES.SUCCESS }));
    });
};

export const dispatchUpdateClient = (data, clientId) => (dispatch) => (
  api.updateClient(data, clientId)
    .then(() => {
      dispatch(enqueueToast({
        message: 'Изменения успешно сохранены',
        type: TOAST_TYPES.SUCCESS,
      }));
    })
);

export const dispatchSetClient = (data) => (dispatch) => (
  api.setClient(data)
    .then(() => {
      dispatch(enqueueToast({
        message: 'Клиент успешно добавлен',
        type: TOAST_TYPES.SUCCESS,
      }));
    })
);
