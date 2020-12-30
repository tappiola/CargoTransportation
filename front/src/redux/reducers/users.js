import * as types from '../actions/actionTypes';

const initialState = {
  usersData: [],
  usersLoadComplete: false,
};

export function usersReducer(state = initialState, action) {
  switch (action.type) {
    case types.USERS_SET: {
      return {
        ...state,
        usersData: action.usersData,
        usersLoadComplete: true,
      };
    }
    case types.USERS_DELETE: {
      return {
        ...state,
        usersData: [...state.usersData.filter((u) => !action.ids.includes(String(u.id)))],
      };
    }

    default: {
      return state;
    }
  }
}
