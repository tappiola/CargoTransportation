import * as types from '../actions/actionTypes';

const initialState = {
  usersData: [],
  usersLoadComplete: false,
};

export function usersReducer(state = initialState, action) {
  switch (action.type) {
    case types.USERS_SET: {
      const usersData = action.usersData.map(({ company, ...others }) => ({
        ...others,
        companyName: company?.name,
        companyAccountNumber: company?.unn,
      }));

      return {
        ...state,
        usersData,
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
