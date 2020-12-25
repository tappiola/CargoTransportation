import * as types from '../actions/actionTypes';

const initialState = {
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.AUTHORIZATION_COMPLITED: {
      return {
        ...state,
        authorization: action.status,
      };
    }

    default: {
      return state;
    }
  }
}
