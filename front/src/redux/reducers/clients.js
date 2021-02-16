/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { enqueueToast } from './notifications';
import * as api from 'api';
import { TOAST_TYPES } from 'constants/toastsTypes';

const initialState = {
  clientsData: [],
  clientsLoadComplete: false,
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setClients(state, action) {
      state.clientsData = action.payload;
      state.clientsLoadComplete = true;
    },
    deleteClients: {
      reducer: (state, action) => {
        state.clientsData = state.clientsData
          .filter(({ id }) => !action.payload.includes(String(id)));
      },
    },
  },
});

export const { setClients, deleteClients } = clientsSlice.actions;

export default clientsSlice.reducer;

export const dispatchGetClients = () => (dispatch) => (
  api.getClients()
    .then((data) => dispatch(setClients(data)))
);

export const dispatchDeleteClients = (ids) => (dispatch) => {
  api.deleteClients(ids)
    .then(() => {
      dispatch(deleteClients(ids));
      dispatch(enqueueToast({
        message: 'Клиенты были успешно удалены',
        type: TOAST_TYPES.SUCCESS,
      }));
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
