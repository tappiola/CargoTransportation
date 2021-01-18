import { getAuthToken } from 'utils';
import * as types from '../actions/actionTypes';

const initialState = {
  authorization: {
    isSuccess: !!getAuthToken(),
  },
};

export function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case types.AUTHORIZATION_COMPLETED: {
      return {
        ...state,
        isAuthorized: action.isAuthorized,
      };
    }

    case types.CURRENT_USER_LOGOUT: {
      localStorage.removeItem('token');
      return {
        ...initialState,
        isAuthorized: false,
      };
    }

    default: {
      return state;
    }
  }
}
