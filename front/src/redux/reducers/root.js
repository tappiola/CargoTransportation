import { combineReducers } from 'redux';

import clientsReducer from './clients';
import consignmentNotesReducer from './consignmentNotes';
import currentUserReducer from './currentUser';
import employeesReducer from './employees';
import notificationsReducer from './notifications';
import usersReducer from './users';
import warehousesReducer from './warehouses';
import waybillsReducer from './waybills';

export default combineReducers({
  clients: clientsReducer,
  consignmentNotes: consignmentNotesReducer,
  currentUser: currentUserReducer,
  employees: employeesReducer,
  notifications: notificationsReducer,
  users: usersReducer,
  warehouses: warehousesReducer,
  waybills: waybillsReducer,
});
