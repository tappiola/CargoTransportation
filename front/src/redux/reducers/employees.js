import * as types from '../actions/actionTypes';

const initialState = {
  employeesData: [],
  employeesLoadComplete: false,
};

export function employeesReducer(state = initialState, action) {
  switch (action.type) {
    case types.EMPLOYEES_SET: {
      return {
        ...state,
        employeesData: action.employeesData,
        employeesLoadComplete: true,
      };
    }
    case types.EMPLOYEES_DELETE: {
      return {
        ...state,
        employeesData: [...state.employeesData.filter((u) => !action.ids.includes(String(u.id)))],
      };
    }

    default: {
      return state;
    }
  }
}
