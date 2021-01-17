import { combineReducers } from 'redux';

import { currentUserReducer } from './currentUser';
import { employeesReducer } from './employees';
import { usersReducer } from './users';
import { notificationsReducer } from './notifications';

export default combineReducers({
  currentUser: currentUserReducer,
  employees: employeesReducer,
  users: usersReducer,
  notifications: notificationsReducer,
});
