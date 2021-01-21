import * as actionTypes from './actionTypes';
import * as api from 'api';
import { authorizationCompleted } from 'redux/actions';

const redirectionHandler = (dispatch) => ({ error }) => {
  if (error?.message === 'Forbidden') {
    dispatch(authorizationCompleted(false));
  }
};

export const setUsers = (usersData) => ({
  type: actionTypes.USERS_SET,
  usersData,
});

export const handleDeleteUsers = (ids) => ({
  type: actionTypes.USERS_DELETE,
  ids,
});

export const dispatchGetUsers = () => (dispatch) => (
  api
    .getUsers()
    .then(
      (data) => dispatch(setUsers(data)),
      redirectionHandler(dispatch),
    )
);

export const dispatchSetUser = (data) => (dispatch) => (
  api
    .setUser(data)
    .then(
      () => dispatch({
        type: actionTypes.USERS_SET_USER_COMPLETE,
        isSuccess: true,
      }),
      redirectionHandler(dispatch),
    )
);

export const dispatchUpdateUser = ({ id, ...data }) => () => (
  api.updateUser(data, id)
);

export const dispatchDeleteUsers = (ids) => (dispatch) => (
  api
    .deleteUsers(ids)
    .then(() => dispatch(handleDeleteUsers(ids)))
);
