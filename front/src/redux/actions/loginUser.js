import * as api from 'api';
import { authorizationCompleted } from './authorizationCompleted';

export const loginUser = (email, password) => (dispatch) => api.signIn(email, password).then(
  ({ token }) => {
    if (token) {
      localStorage.setItem('token', token);
    }

    dispatch(authorizationCompleted({ isSuccess: false }));
  },
  (/* err */) => {
    dispatch(authorizationCompleted({ isFailed: true }));
  },
);
