import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from 'features/Clients/clientsSlice';
import consignmentNotesReducer from 'features/ConsignmentNotes/consignmentNotesSlice';
import currentUserReducer from 'features/CurrentUser/currentUserSlice';
import employeesReducer from 'features/Employees/employeesSlice';
import notificationsReducer from 'features/Notifier/NotifierSlice';
import usersReducer from 'features/Users/usersSlice';
import warehousesReducer from 'features/Warehouses/warehousesSlice';
import waybillsReducer from 'features/Waybills/waybillsSlice';

import { throttle, loadState, saveState } from 'utils';

const preloadedState = loadState();

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
  },
  preloadedState,
  devTools: process.env.NODE_ENV !== 'production',
});

store.subscribe(throttle(() => {
  saveState({ ...store.getState() });
}, 1000));

export default store;
