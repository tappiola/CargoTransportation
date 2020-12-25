import { signIn } from '../../api';
import { authorizationComplited } from './authorizationCompolited';

export const loginUser = (email, password, history) => (dispatch) => signIn(email, password).then(
  ({ token }) => {
    dispatch(authorizationComplited({ isFailed: false }));
    if (token) {
      localStorage.setItem('token', token);
      history.push('/main-page'); // redirect to main page
    }
  },
  (/* err */) => {
    dispatch(authorizationComplited({ isFailed: true }));
  },
);
