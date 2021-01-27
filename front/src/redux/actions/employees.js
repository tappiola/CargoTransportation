import * as actionTypes from './actionTypes';
import { enqueueToast } from './notifications';
import * as api from 'api';
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
  api.getEmployees()
    .then((data) => dispatch(setEmployees(data)))
);

export const dispatchDeleteEmployees = (ids) => (dispatch) => (
  api.deleteEmployees(ids)
    .then(() => {
      dispatch(handleDeleteEmployees(ids));
      dispatch(enqueueToast({ message: 'Удаление сотрудников прошло успешно', type: TOAST_TYPES.SUCCESS }));
    })
);

export const dispatchSetEmployee = (data) => () => (
  api.setEmployee(data)
);

export const dispatchUpdateEmployee = ({ id, ...data }) => () => (
  api.updateEmployee(data, id)
);
