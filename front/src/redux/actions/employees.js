import * as actionTypes from './actionTypes';
import * as api from 'api';

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
  api.getEmployees(1)
    .then((data) => dispatch(setEmployees(data)));
};

export const dispatchDeleteEmployees = (ids) => (dispatch) => {
  api.deleteEmployees(ids)
    .then(() => dispatch(handleDeleteEmployees(ids)));
};
