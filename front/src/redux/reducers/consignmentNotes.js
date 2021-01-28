import * as types from '../actions/actionTypes';

const initialState = {
  consignmentNotesData: [],
  consignmentNotesLoadComplete: false,
};

export function consignmentNotesReducer(state = initialState, action) {
  switch (action.type) {
    case types.CONSIGNMENT_NOTES_SET: {
      return {
        ...state,
        consignmentNotesData: action.consignmentNotesData,
        consignmentNotesLoadComplete: true,
      };
    }
    case types.CONSIGNMENT_NOTES_SET_CURRENT: {
      return {
        ...state,
        current: {
          ...action.consignmentNote,
          goods: action.goods,
        },
      };
    }
    case types.CONSIGNMENT_NOTES_DELETE: {
      return {
        ...state,
        consignmentNotesData:
            [...state.consignmentNotesData.filter((u) => !action.ids.includes(String(u.id)))],
      };
    }

    default: {
      return state;
    }
  }
}
