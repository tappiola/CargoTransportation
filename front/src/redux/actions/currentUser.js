import { signIn, logoutUser } from 'api';
import * as actionTypes from './actionTypes';
import { enqueueToast } from './notifications';

export const authorizationCompleted = (isAuthorized) => ({
  type: actionTypes.AUTHORIZATION_COMPLETED,
  isAuthorized,
});

export const dispatchLogoutUser = () => (dispatch) => {
  dispatch({ type: actionTypes.CURRENT_USER_LOGOUT });
  logoutUser();
};

export const loginUser = (email, password) => (dispatch) => signIn(email, password)
  .then((token) => {
    dispatch(authorizationCompleted(!!token));
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
