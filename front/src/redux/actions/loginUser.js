import { authorizationCompleted } from './authorizationCompleted';
import { signIn } from 'api';

export const loginUser = (email, password) => (dispatch) => signIn(email, password).then(
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
