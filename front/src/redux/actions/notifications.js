import * as actionTypes from './actionTypes';

export const enqueueToast = ({ message, type, duration }) => ({
  type: actionTypes.ENQUEUE_TOAST,
  payload: { message, type, duration },
});

export const processToast = () => ({
  type: actionTypes.PROCESS_TOAST,
});
