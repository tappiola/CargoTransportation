import * as types from '../actions/actionTypes';

const initialState = {
  authorization: {
    isSuccess: true,
  },
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.AUTHORIZATION_COMPLETED: {
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
