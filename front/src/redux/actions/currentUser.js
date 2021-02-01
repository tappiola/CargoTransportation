import jwtDecode from 'jwt-decode';

import * as actionTypes from './actionTypes';
import { enqueueToast } from './notifications';
import * as api from 'api';
import { signIn, logoutUser, updateToken } from 'api';
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
  logoutUser().then(() => localStorage.removeItem('token'));
};

export const loginUser = (email, password) => (dispatch) => signIn(email, password)
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
      updateToken()
        .then((res) => localStorage.setItem('token', res.updateToken));
    }
  }
};

export const getUserProfile = () => (dispatch) => {
  api.getUserProfile().then((data) => dispatch(setUserProfile(data)));
};
