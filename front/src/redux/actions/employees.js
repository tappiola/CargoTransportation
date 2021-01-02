import * as actionTypes from './actionTypes';
import { deleteUsers, getEmployees } from '../../api';

export const setEmployees = (employeesData) => ({
  type: actionTypes.EMPLOYEES_SET,
  employeesData,
});

export const handleDeleteEmployees = (ids) => ({
  type: actionTypes.EMPLOYEES_DELETE,
  ids,
});

export const dispatchGetEmployees = () => (dispatch) => {
  // TODO: get companyId from user profile
  getEmployees(1)
    .then((data) => data.json())
    .then((data) => dispatch(setEmployees(data)));
};

export const dispatchDeleteEmployees = (ids) => (dispatch) => {
  deleteUsers(ids)
    .then(() => dispatch(handleDeleteEmployees(ids)));
};
