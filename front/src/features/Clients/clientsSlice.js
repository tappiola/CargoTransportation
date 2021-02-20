/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { enqueueToast } from 'features/Notifier/NotifierSlice';

import * as api from 'api';
import { TOAST_TYPES } from 'constants/toastsTypes';

export const getClients = createAsyncThunk(
  'clients/getClients',
  api.getClients,
);

export const deleteClients = createAsyncThunk(
  'clients/deleteClients',
  async (ids, { dispatch }) => {
    await api.deleteClients(ids)
      .catch((err) => {
        dispatch(enqueueToast({
          message: err.message || 'Ошибка при удалении клиента',
          type: TOAST_TYPES.ERROR,
        }));

        throw err;
      });

    dispatch(enqueueToast({
      message: 'Клиенты были успешно удалены',
      type: TOAST_TYPES.SUCCESS,
    }));

    return ids;
  },
);

export const updateClient = createAsyncThunk(
  'clients/updateClient',
  async ({ formData, clientId }, { dispatch }) => {
    await api.updateClient(formData, clientId)
      .catch((err) => {
        dispatch(enqueueToast({
          message: err.message || 'Ошибка при обновлении клиента',
          type: TOAST_TYPES.ERROR,
        }));

        throw err;
      });

    dispatch(enqueueToast({
      message: 'Изменения успешно сохранены',
      type: TOAST_TYPES.SUCCESS,
    }));
  },
);

export const setClient = createAsyncThunk(
  'clients/setClient',
  async ({ formData }, { dispatch }) => {
    const response = await api.setClient(formData)
      .catch((err) => {
        dispatch(enqueueToast({
          message: err.message || 'Ошибка при создании клиента',
          type: TOAST_TYPES.ERROR,
        }));

        throw err;
      });

    dispatch(enqueueToast({
      message: 'Клиент успешно добавлен',
      type: TOAST_TYPES.SUCCESS,
    }));

    return response;
  },
);

const initialState = {
  clientsData: [],
  clientsLoadComplete: false,
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  extraReducers: {
    [getClients.fulfilled]: (state, action) => {
      state.clientsData = action.payload;
      state.clientsLoadComplete = true;
    },
    [deleteClients.fulfilled]: (state, action) => {
      state.clientsData = state.clientsData
        .filter(({ id }) => !action.payload.includes(String(id)));
    },
    [setClient.fulfilled]: (state, action) => {
      state.clientsData.push(action.payload);
    },
  },
});

export default clientsSlice.reducer;
