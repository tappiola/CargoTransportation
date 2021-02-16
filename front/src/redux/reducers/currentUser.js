import * as types from '../actions/actionTypes';
import { getAuthToken } from 'utils';

const initialState = {
  isAuthorized: !!getAuthToken(),
  roles: [],
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

    case types.USER_PROFILE_SET: {
      return {
        ...state,
        roles: action.roles,
        company: action.companyName,
        fullName: action.fullName,
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
