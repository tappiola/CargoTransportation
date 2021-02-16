import jwtDecode from 'jwt-decode';

import * as actionTypes from './actionTypes';
import { enqueueToast } from './notifications';
import * as api from 'api';
import { BACKEND_HOST } from 'constants/environment';
import { TOAST_TYPES } from 'constants/toastsTypes';
import { getAuthToken } from 'utils';

export const authorizationCompleted = (isAuthorized, roles, company, fullName) => ({
  type: actionTypes.AUTHORIZATION_COMPLETED,
  isAuthorized,
  roles,
  company,
  fullName,
});

export const setUserProfile = ({ companyName, fullName, roles }) => ({
  type: actionTypes.USER_PROFILE_SET,
  companyName,
  fullName,
  roles,
});

export const dispatchLogoutUser = () => (dispatch) => {
  dispatch({ type: actionTypes.CURRENT_USER_LOGOUT });
  localStorage.removeItem('token');
};

export const loginUser = (email, password) => (dispatch) => api.signIn(email, password)
  .then(({ token, roles, companyId }) => {
    localStorage.setItem('token', token);
    const userRoles = roles.map(({ role }) => role);
    dispatch(authorizationCompleted(!!token, userRoles, companyId));

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

export const getUserProfile = () => (dispatch) => {
  api.getUserProfile().then((data) => dispatch(setUserProfile(data)));
};

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
