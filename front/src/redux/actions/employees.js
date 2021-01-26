import * as actionTypes from './actionTypes';
import { enqueueToast } from './notifications';
import {
  deleteEmployees, getEmployees, setEmployee, updateEmployee,
} from 'api';
import { TOAST_TYPES } from 'constants/toastsTypes';

export const setEmployees = (employeesData) => ({
  type: actionTypes.EMPLOYEES_SET,
  employeesData,
});

export const handleDeleteEmployees = (ids) => ({
  type: actionTypes.EMPLOYEES_DELETE,
  ids,
});

export const dispatchGetEmployees = () => (dispatch) => (
  getEmployees()
    .then((data) => dispatch(setEmployees(data)))
);

export const dispatchDeleteEmployees = (ids) => (dispatch) => (
  deleteEmployees(ids)
    .then(() => {
      dispatch(handleDeleteEmployees(ids));
      dispatch(enqueueToast({ message: 'Удаление сотрудников прошло успешно', type: TOAST_TYPES.SUCCESS }));
    })
);

export const dispatchSetEmployee = (data) => () => (
  setEmployee(data)
);

export const dispatchUpdateEmployee = ({ id, ...data }) => () => (
  updateEmployee(data, id)
);
