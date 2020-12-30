import { combineReducers } from 'redux';

import { anotherReducer } from './another';
import { userReducer } from './user';
import { usersReducer } from './users';

export default combineReducers({
  another: anotherReducer,
  user: userReducer,
  users: usersReducer,
});
