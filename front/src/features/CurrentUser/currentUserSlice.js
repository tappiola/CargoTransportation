/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { enqueueToast } from 'features/Notifier/NotifierSlice';
import jwtDecode from 'jwt-decode';

import * as api from 'api';
import { BACKEND_HOST } from 'constants/environment';
import { TOAST_TYPES } from 'constants/toastsTypes';
import { getAuthToken } from 'utils';

const initialState = {
  isAuthorized: !!getAuthToken(),
  roles: [],
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    authorizationCompleted(state, action) {
      state.isAuthorized = action.payload.isAuthorized;
      state.roles = action.payload.roles;
      state.companyId = action.payload.companyId;
    },
    setUserProfile(state, action) {
      state.roles = action.payload.roles;
      state.company = action.payload.companyName;
      state.fullName = action.payload.fullName;
    },
    logoutUser(state) {
      state.isAuthorized = false;
    },
  },
});

export const { authorizationCompleted, setUserProfile, logoutUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;

export const dispatchLogoutUser = () => (dispatch) => {
  dispatch(logoutUser);
  localStorage.removeItem('token');
};

export const loginUser = (email, password) => (dispatch) => api.signIn(email, password)
  .then(({ token, roles, companyId }) => {
    localStorage.setItem('token', token);
    const userRoles = roles.map(({ role }) => role);
    dispatch(authorizationCompleted({ isAuthorized: !!token, roles: userRoles, companyId }));

    dispatch(enqueueToast({
      message: 'Вход в систему выполнен успешно',
      type: TOAST_TYPES.SUCCESS,
    }));
  },
  (err) => {
    dispatch(authorizationCompleted(false));

    dispatch(enqueueToast({
      message: err.message || 'Произошла ошибка',
      type: TOAST_TYPES.ERROR,
    }));
  });

export const refreshTokenIfExpired = () => {
  const lsToken = getAuthToken();

  if (lsToken) {
    const { exp } = jwtDecode(lsToken);
    if (exp && exp > Date.now()) {
      api.updateToken()
        .then((res) => localStorage.setItem('token', res.updateToken));
    }
  }
};

export const getUserProfile = () => (dispatch) => (
  api.getUserProfile()
    .then((data) => dispatch(setUserProfile(data)))
);

export const subscribeOnMessages = () => (dispatch) => {
  const url = new URL(BACKEND_HOST);
  url.protocol = 'ws:';

  let ws = new WebSocket(`${url.origin}/notifications`);

  ws.onmessage = ({ data }) => {
    const { type, message } = JSON.parse(data);
    const isMuted = localStorage.getItem('muted') === 'true';

    if (isMuted) {
      return;
    }

    dispatch(enqueueToast({ message, type }));
  };

  ws.onerror = () => {
    ws = new WebSocket(`${url.origin}/notifications`);
  };
};
