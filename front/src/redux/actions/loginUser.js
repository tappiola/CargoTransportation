import { signIn } from 'api';
import { authorizationCompleted } from './authorizationCompoleted';

export const loginUser = (email, password, history) => (dispatch) => signIn(email, password).then(
  ({ token }) => {
    if (token) {
      localStorage.setItem('token', token);
      history.push('/main-page');
    }

    dispatch(authorizationCompleted({ isFailed: !!token }));
  },
  (/* err */) => {
    dispatch(authorizationCompleted({ isFailed: true }));
  },
);
