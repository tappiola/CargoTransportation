/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { authorizationCompleted } from './currentUser';
import { enqueueToast } from './notifications';
import * as api from 'api';
import { TOAST_TYPES } from 'constants/toastsTypes';

const redirectionHandler = (dispatch) => ({ error }) => {
  if (error?.message === 'Forbidden') {
    dispatch(authorizationCompleted(false));
  }
};

const initialState = {
  usersData: [],
  usersLoadComplete: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      const usersData = action.payload.map(({ company, ...others }) => ({
        ...others,
        companyName: company?.name,
        companyAccountNumber: company?.unn,
      }));

      state.usersData = usersData;
      state.usersLoadComplete = true;
    },
    deleteUsers: {
      reducer: (state, action) => {
        state.usersData = state.usersData
          .filter(({ id }) => !action.payload.includes(String(id)));
      },
    },
    setUsersComplete(state, action) {
      state.usersSettingComplete = action.payload;
    },
  },
});

export const { setUsers, deleteUsers, setUsersComplete } = usersSlice.actions;

export default usersSlice.reducer;

export const dispatchGetUsers = () => (dispatch) => (
  api
    .getUsers()
    .then(
      (data) => dispatch(setUsers(data)),
      redirectionHandler(dispatch),
    )
);

export const dispatchSetUser = (data) => (dispatch) => (
  api
    .setUser(data)
    .then(
      () => dispatch(setUsersComplete(true)),
      redirectionHandler(dispatch),
    )
);

export const dispatchUpdateUser = ({ id, ...data }) => () => (
  api.updateUser(data, id)
);

export const dispatchDeleteUsers = (ids) => (dispatch) => (
  api
    .deleteUsers(ids)
    .then(() => {
      dispatch(deleteUsers(ids));
      dispatch(enqueueToast({ message: 'Пользователи были успешно удалены', type: TOAST_TYPES.SUCCESS }));
    })
);
