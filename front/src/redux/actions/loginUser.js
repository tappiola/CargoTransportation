import { authorizationCompleted } from './authorizationCompoleted';
import { signIn } from 'api';

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
