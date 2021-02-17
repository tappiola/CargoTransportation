/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

export const loginUser = createAsyncThunk(
  'currentUser/loginUser',
  async ({ email, password }, { dispatch }) => {
    const response = await api.signIn(email, password)
      .catch((err) => {
        dispatch(enqueueToast({
          message: err.message || 'Произошла ошибка',
          type: TOAST_TYPES.ERROR,
        }));
      });

    dispatch(enqueueToast({
      message: 'Вход в систему выполнен успешно',
      type: TOAST_TYPES.SUCCESS,
    }));

    return response;
  },
);

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUserProfile(state, action) {
      const { roles, companyName, fullName } = action.payload;
      state.roles = roles;
      state.company = companyName;
      state.fullName = fullName;
    },
    logoutUser(state) {
      state.isAuthorized = false;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      const { token, roles, companyId } = action.payload;
      state.isAuthorized = true;
      state.roles = roles.map(({ role }) => role);
      state.companyId = companyId;
      localStorage.setItem('token', token);
    },
    [loginUser.rejected]: (state) => {
      state.isAuthorized = false;
    },
  },
});

export const { setUserProfile, logoutUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;

export const dispatchLogoutUser = () => (dispatch) => {
  dispatch(logoutUser);
  localStorage.removeItem('token');
};

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
