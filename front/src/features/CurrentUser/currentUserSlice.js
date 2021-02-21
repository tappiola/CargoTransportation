/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { enqueueToast } from 'features/Notifier/NotifierSlice';
import jwtDecode from 'jwt-decode';

import * as api from 'api';
import { BACKEND_HOST } from 'constants/environment';
import { TOAST_TYPES } from 'constants/toastsTypes';
import { getAuthToken } from 'utils';
import { isProduction } from 'utils/environment';

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

        throw err;
      });

    dispatch(enqueueToast({
      message: 'Вход в систему выполнен успешно',
      type: TOAST_TYPES.SUCCESS,
    }));

    return response;
  },
);

export const getUserProfile = createAsyncThunk(
  'currentUser/getUserProfile',
  api.getUserProfile,
);

export const logoutUser = createAsyncThunk(
  'currentUser/logoutUser',
  async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('state');
  },
);

export const refreshTokenIfExpired = createAsyncThunk(
  'currentUser/updateToken',
  async () => {
    const lsToken = getAuthToken();

    if (lsToken) {
      const { exp } = jwtDecode(lsToken);

      if (exp && exp > Date.now()) {
        const { updateToken } = await api.updateToken();
        localStorage.setItem('token', updateToken);
      }
    }
  },
);

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      const { token, roles, companyId } = action.payload || {};
      state.isAuthorized = true;
      state.roles = roles.map(({ role }) => role);
      state.companyId = companyId;
      localStorage.setItem('token', token);
    },
    [loginUser.rejected]: (state) => {
      state.isAuthorized = false;
    },
    [getUserProfile.fulfilled]: (state, action) => {
      const { roles, companyName, fullName } = action?.payload;
      state.roles = roles;
      state.company = companyName;
      state.fullName = fullName;
    },
    [logoutUser.fulfilled]: (state) => {
      state.isAuthorized = false;
    },
  },
});

export default currentUserSlice.reducer;

export const subscribeOnMessages = () => (dispatch) => {
  const url = new URL(BACKEND_HOST || window.location.origin);
  url.protocol = isProduction() ? 'wss:' : 'ws:';

  let ws = new WebSocket(`${url.origin}/notifications`);

  ws.onmessage = ({ data }) => {
    const { type, message } = JSON.parse(data);
    const isMuted = localStorage.getItem('muted') === 'true';

    if (isMuted) {
      return;
    }

    dispatch(enqueueToast({ message, type, duration: 60 * 1000 * 5 }));
  };

  ws.onerror = () => {
    ws = new WebSocket(`${url.origin}/notifications`);
  };
};
