import { currentUserReducer } from './currentUser';
import { employeesReducer } from './employees';
import { usersReducer } from './users';
import { combineReducers } from 'redux';

export default combineReducers({
  currentUser: currentUserReducer,
  employees: employeesReducer,
  users: usersReducer,
});
