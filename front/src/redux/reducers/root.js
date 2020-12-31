import { combineReducers } from 'redux';

import { anotherReducer } from './another';
import { currentUserReducer } from './currentUser';
import { usersReducer } from './users';

export default combineReducers({
  another: anotherReducer,
  currentUser: currentUserReducer,
  users: usersReducer,
});
