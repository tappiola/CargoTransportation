import { deleteUsers, getUsers } from 'api';
import * as api from 'api';
import * as actionTypes from './actionTypes';

import { deleteUsers, getUsers } from 'api';

export const setUsers = (usersData) => ({
  type: actionTypes.USERS_SET,
  usersData,
});

export const handleDeleteUsers = (ids) => ({
  type: actionTypes.USERS_DELETE,
  ids,
});

export const dispatchGetUsers = () => (dispatch) => {
  getUsers()
    .then((data) => dispatch(setUsers(data)));
};

export const dispatchSetUser = ({ id, ...data }) => (dispatch) => {
  api
    .setUser({ id, data })
    .then(
      () => dispatch({
        type: actionTypes.USERS_SET_USER_COMPLETE,
        isSuccess: true,
      }),
      () => dispatch({
        type: actionTypes.USERS_SET_USER_COMPLETE,
        isSuccess: false,
      }),
    )
    .catch(() => dispatch({
      type: actionTypes.USERS_SET_USER_COMPLETE,
      isSuccess: false,
    }));
};

export const dispatchUpdateUser = ({ id, ...data }) => () => {
  api.updateUser(data, id);
};

export const dispatchDeleteUsers = (ids) => (dispatch) => {
  deleteUsers(ids)
    .then(() => dispatch(handleDeleteUsers(ids)));
};
