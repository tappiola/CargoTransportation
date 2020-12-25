import { combineReducers } from 'redux';

import { anotherReducer } from './another';
import { userReducer } from './user';

export default combineReducers({
  another: anotherReducer,
  user: userReducer,
});
