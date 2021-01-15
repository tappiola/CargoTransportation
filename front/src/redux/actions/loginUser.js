import { signIn } from 'api';
import { authorizationCompleted } from './authorizationCompoleted';

export const loginUser = (email, password) => (dispatch) => signIn(email, password).then(
  ({ token }) => {
    if (token) {
      localStorage.setItem('token', token);
    }

    dispatch(authorizationCompleted({ isSuccess: true }));
  },
  (/* err */) => {
    dispatch(authorizationCompleted({ isFailed: true }));
  },
);
