import * as types from '../actions/actionTypes';

const initialState = {
  usersData: [],
  usersLoadComplete: false,
  userToUpdate: {
    id: 'ID0239483',
    firstname: 'John',
    surname: 'Smith',
    middleName: 'Mario',
    email: '',
    password: '',
    roles: {},
    birthDate: new Date(),
    adress: {
      city: '',
      street: '',
      house: '',
    },
  },
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
    case types.USERS_SET_USER_COMPLETE: {
      return {
        ...state,
        usersSettingComplete: {
          status: true,
          isSuccess: action.isSuccess,
        },
      };
    }

    default: {
      return state;
    }
  }
}
