import { getAuthToken } from 'utils';
import * as types from '../actions/actionTypes';

const initialState = {
  roles: [],
  isAuthorized: !!getAuthToken(),
  companyId: null,
};

export function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case types.AUTHORIZATION_COMPLETED: {
      return {
        ...state,
        isAuthorized: action.isAuthorized,
        roles: action.roles,
        companyId: action.companyId,
      };
    }

    case types.CURRENT_USER_LOGOUT: {
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
