/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { enqueueToast } from 'features/Notifier/NotifierSlice';

import * as api from 'api';
import { TOAST_TYPES } from 'constants/toastsTypes';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  api.getUsers,
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, ...data }, { dispatch }) => {
    await api.updateUser(data, id).catch((err) => {
      dispatch(enqueueToast({
        message: err.message || 'Oшибка при обновлении пользователя',
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

export const deleteUsers = createAsyncThunk(
  'users/deleteUsers',
  async (ids, { dispatch }) => {
    await api.deleteUsers(ids)
      .catch((err) => {
        dispatch(enqueueToast({
          message: err.message || 'Oшибка при удалении пользователей',
          type: TOAST_TYPES.ERROR,
        }));

        throw err;
      });

    dispatch(enqueueToast({
      message: 'Пользователи были успешно удалены',
      type: TOAST_TYPES.SUCCESS,
    }));

    return ids;
  },
);

export const setUser = createAsyncThunk(
  'users/setUser',
  api.setUser,
);

const initialState = {
  usersData: [],
  usersLoadComplete: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: {
    [deleteUsers.fulfilled]: (state, action) => {
      state.usersData = state.usersData
        .filter(({ id }) => !action.payload.includes(String(id)));
    },
    [getUsers.fulfilled]: (state, action) => {
      const usersData = action.payload.map(({ company, ...others }) => ({
        ...others,
        companyName: company?.name,
        companyAccountNumber: company?.unn,
      }));

      state.usersData = usersData;
      state.usersLoadComplete = true;
    },
    [setUser.fulfilled]: (state) => {
      state.usersSettingComplete = true;
    },
    [setUser.rejected]: (state) => {
      state.usersSettingComplete = false;
    },
  },
});

export default usersSlice.reducer;
