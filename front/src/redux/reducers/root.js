import { combineReducers } from 'redux';

import { anotherReducer } from './another';
import { currentUserReducer } from './currentUser';
import { employeesReducer } from './employees';
import { usersReducer } from './users';

export default combineReducers({
  another: anotherReducer,
  currentUser: currentUserReducer,
  employees: employeesReducer,
  users: usersReducer,
});
