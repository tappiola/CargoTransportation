import * as actionTypes from './actionTypes';

export const authorizationCompleted = (status) => ({
  type: actionTypes.AUTHORIZATION_COMPLETED,
  status,
});
