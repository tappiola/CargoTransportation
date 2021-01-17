import { signIn } from 'api';
import { authorizationCompleted } from './authorizationCompoleted';
import { enqueueToast } from './notifications';

export const loginUser = (email, password) => (dispatch) => signIn(email, password).then(
  ({ token }) => {
    if (token) {
      localStorage.setItem('token', token);
    }

    dispatch(authorizationCompleted({ isSuccess: true }));
    dispatch(enqueueToast({
      message: 'Вход в систему выполнен успешно',
      type: 'success',
    }));
  },
  (err) => {
    dispatch(authorizationCompleted({ isFailed: true }));
    dispatch(enqueueToast({
      message: err.message || 'Произошла ошибка',
      type: 'error',
    }));
  },
);
