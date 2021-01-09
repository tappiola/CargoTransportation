import { combineReducers } from 'redux';

import { clientsReducer } from './clients';
import { consignmentNotesReducer } from './consignmentNotes';
import { currentUserReducer } from './currentUser';
import { employeesReducer } from './employees';
import { usersReducer } from './users';
import { warehousesReducer } from './warehouses';
import { waybillsReducer } from './waybills';

export default combineReducers({
  currentUser: currentUserReducer,
  employees: employeesReducer,
  users: usersReducer,
  clients: clientsReducer,
  warehouses: warehousesReducer,
  consignmentNotes: consignmentNotesReducer,
  waybills: waybillsReducer,
});
