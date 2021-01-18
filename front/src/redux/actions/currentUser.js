import * as actionTypes from './actionTypes';
import { signIn, logoutUser } from 'api';
import { enqueueToast } from './notifications';

export const authorizationCompleted = (isAuthorized, roles, companyId) => ({
  type: actionTypes.AUTHORIZATION_COMPLETED,
  isAuthorized,
  roles,
  companyId,
});

export const dispatchLogoutUser = () => (dispatch) => {
  dispatch({ type: actionTypes.CURRENT_USER_LOGOUT });
  localStorage.removeItem('token');
  localStorage.removeItem('roles');
  logoutUser();
};

export const loginUser = (email, password) => (dispatch) => signIn(email, password)
  .then(({ token, roles, companyId }) => {
    const userRoles = roles.map(({ role }) => role);
    dispatch(authorizationCompleted(!!token, userRoles, companyId));
    localStorage.setItem('token', token);

    dispatch(enqueueToast({
      message: 'Вход в систему выполнен успешно',
      type: 'success',
    }));
  },
  (err) => {
    dispatch(authorizationCompleted(false));

    dispatch(enqueueToast({
      message: err.message || 'Произошла ошибка',
      type: 'error',
    }));
  });
