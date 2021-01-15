import { combineReducers } from 'redux';

import { currentUserReducer } from './currentUser';
import { employeesReducer } from './employees';
import { usersReducer } from './users';

export default combineReducers({
  currentUser: currentUserReducer,
  employees: employeesReducer,
  users: usersReducer,
});
