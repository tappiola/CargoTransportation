import * as types from '../actions/actionTypes';

const initialState = {
  warehousesData: [],
  warehousesLoadComplete: false,
};

export function warehousesReducer(state = initialState, action) {
  switch (action.type) {
    case types.WAREHOUSES_SET: {
      return {
        ...state,
        warehousesData: action.warehousesData,
        warehousesLoadComplete: true,
      };
    }
    case types.WAREHOUSES_DELETE: {
      return {
        ...state,
        warehousesData: [...state.warehousesData.filter((u) => !action.ids.includes(String(u.id)))],
      };
    }

    default: {
      return state;
    }
  }
}
