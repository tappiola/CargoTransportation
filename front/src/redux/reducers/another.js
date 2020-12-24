import * as types from '../actions/actionTypes';

const initialState = {};

export function anotherReducer(state = initialState, action) {
    switch (action.type) {
        case types.SOME_ACTION_TYPE: {
            return {
                ...state,
            }
        }
        
        default: {
            return state;
        }
    }
}