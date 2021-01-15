import { signIn, logoutUser } from 'api';
import * as actionTypes from './actionTypes';

export const authorizationCompleted = (isAuthorized, roles) => ({
  type: actionTypes.AUTHORIZATION_COMPLETED,
  isAuthorized,
  roles,
});

export const dispatchLogoutUser = () => (dispatch) => {
  dispatch({ type: actionTypes.CURRENT_USER_LOGOUT });
  logoutUser();
};

export const loginUser = (email, password) => (dispatch) => signIn(email, password)
  .then(({ token, roles }) => {
    const userRoles = roles.map(({ role }) => role);
    dispatch(authorizationCompleted(!!token, userRoles));
    localStorage.setItem('token', token);
  });
