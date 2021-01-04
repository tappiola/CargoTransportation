import { combineReducers } from 'redux';

import { currentUserReducer } from './currentUser';
import { usersReducer } from './users';

export default combineReducers({
  currentUser: currentUserReducer,
  users: usersReducer,
});
