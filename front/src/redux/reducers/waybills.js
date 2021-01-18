import * as types from '../actions/actionTypes';

const initialState = {
  waybillsData: [],
  waybillsLoadComplete: false,
};

export function waybillsReducer(state = initialState, action) {
  switch (action.type) {
    case types.WAYBILLS_SET: {
      return {
        ...state,
        waybillsData: action.waybillsData,
        waybillsLoadComplete: true,
      };
    }
    case types.WAYBILLS_DELETE: {
      return {
        ...state,
        waybillsData: [...state.waybillsData.filter((u) => !action.ids.includes(String(u.id)))],
      };
    }

    default: {
      return state;
    }
  }
}
