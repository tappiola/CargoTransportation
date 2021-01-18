import * as types from '../actions/actionTypes';

const initialState = {
  notifications: [],
};

export function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case types.ENQUEUE_TOAST:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.payload,
          },
        ],
      };
    case types.PROCESS_TOAST:
      return {
        ...state,
        notifications: [...state.notifications.slice(1)],
      };
    default:
      return state;
  }
}
