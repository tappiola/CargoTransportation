import * as actionTypes from './actionTypes';

export const authorizationComplited = (status) => ({
  type: actionTypes.AUTHORIZATION_COMPLITED,
  status,
});
