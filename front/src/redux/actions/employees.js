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

export const dispatchGetEmployees = (companyId) => (dispatch) => {
  api
    .getEmployees(companyId)
    .then((data) => dispatch(setEmployees(data)));
};

export const dispatchDeleteEmployees = (ids) => (dispatch) => {
  api
    .deleteEmployees(ids)
    .then(() => dispatch(handleDeleteEmployees(ids)));
};

export const dispatchSetEmployee = ({ companyId, ...data }) => () => {
  api.setEmployee({ companyId, data });
};

export const dispatchUpdateEmployee = ({ id, ...data }) => () => {
  api.updateEmployee(data, id);
};
