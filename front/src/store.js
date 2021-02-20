import { configureStore } from '@reduxjs/toolkit';
import reportsReducer from 'features/Acts/actSlice';
import clientsReducer from 'features/Clients/clientsSlice';
import consignmentNotesReducer from 'features/ConsignmentNotes/consignmentNotesSlice';
import currentUserReducer from 'features/CurrentUser/currentUserSlice';
import employeesReducer from 'features/Employees/employeesSlice';
import notificationsReducer, { enqueueToast } from 'features/Notifier/NotifierSlice';
import usersReducer from 'features/Users/usersSlice';
import warehousesReducer from 'features/Warehouses/warehousesSlice';
import waybillsReducer from 'features/Waybills/waybillsSlice';

import { TOAST_TYPES } from 'constants/toastsTypes';
import { throttle, loadState, saveState } from 'utils';

const preloadedState = loadState();

const errorHandler = (store) => (next) => (action) => {
  if (action?.error?.message === 'Forbidden') {
    store.dispatch(enqueueToast({
      type: TOAST_TYPES.ERROR,
      message: 'Вы не авторизованы',
    }));
  }

  return next(action);
};

const store = configureStore({
  reducer: {
    clients: clientsReducer,
    consignmentNotes: consignmentNotesReducer,
    currentUser: currentUserReducer,
    employees: employeesReducer,
    notifications: notificationsReducer,
    users: usersReducer,
    warehouses: warehousesReducer,
    waybills: waybillsReducer,
    reports: reportsReducer,
  },
  preloadedState,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), errorHandler],
});

store.subscribe(throttle(() => {
  saveState({ ...store.getState() });
}, 1000));

export default store;
