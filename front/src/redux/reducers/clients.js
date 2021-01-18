import * as types from '../actions/actionTypes';

const initialState = {
  clientsData: [],
  clientsLoadComplete: false,
};

export function clientsReducer(state = initialState, action) {
  switch (action.type) {
    case types.CLIENTS_SET: {
      return {
        ...state,
        clientsData: action.clientsData,
        clientsLoadComplete: true,
      };
    }
    case types.CLIENTS_DELETE: {
      return {
        ...state,
        clientsData: [...state.clientsData.filter((u) => !action.ids.includes(String(u.id)))],
      };
    }

    default: {
      return state;
    }
  }
}
