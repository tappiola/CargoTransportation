import {
  deleteEmployees, getEmployees, setEmployee, updateEmployee,
} from 'api';
import * as actionTypes from './actionTypes';

export const setEmployees = (employeesData) => ({
  type: actionTypes.EMPLOYEES_SET,
  employeesData,
});

export const handleDeleteEmployees = (ids) => ({
  type: actionTypes.EMPLOYEES_DELETE,
  ids,
});

export const dispatchGetEmployees = (companyId) => (dispatch) => {
  getEmployees(companyId)
    .then((data) => dispatch(setEmployees(data)));
};

export const dispatchDeleteEmployees = (ids) => (dispatch) => {
  deleteEmployees(ids)
    .then(() => dispatch(handleDeleteEmployees(ids)));
};

export const dispatchSetEmployee = ({ companyId, ...data }) => () => {
  setEmployee({ companyId, data });
};

export const dispatchUpdateEmployee = ({ id, ...data }) => () => {
  updateEmployee(data, id);
};
