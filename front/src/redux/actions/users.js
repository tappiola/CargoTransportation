import { deleteUsers, getUsers } from 'api';
import * as actionTypes from './actionTypes';

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
    .then((data) => data.json())
    .then((data) => dispatch(setUsers(data)));
};

export const dispatchDeleteUsers = (ids) => (dispatch) => {
  deleteUsers(ids)
    .then(() => dispatch(handleDeleteUsers(ids)));
};
