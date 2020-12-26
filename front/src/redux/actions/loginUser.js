import { signIn } from '../../api';
import { authorizationCompleted } from './authorizationCompoleted';

export const loginUser = (email, password, history) => (dispatch) => signIn(email, password).then(
  ({ token }) => {
    dispatch(authorizationCompleted({ isFailed: false }));
    if (token) {
      localStorage.setItem('token', token);
      history.push('/main-page'); // redirect to main page
    }
  },
  (/* err */) => {
    dispatch(authorizationCompleted({ isFailed: true }));
  },
);
