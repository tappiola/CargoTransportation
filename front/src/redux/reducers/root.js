import { combineReducers } from 'redux';

import { anotherReducer } from './another';

export default combineReducers({
  another: anotherReducer,
});
