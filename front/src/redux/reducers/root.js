import { combineReducers } from 'redux';

import { clientsReducer } from './clients';
import { currentUserReducer } from './currentUser';
import { employeesReducer } from './employees';
import { usersReducer } from './users';
import { warehousesReducer } from './warehouses';

export default combineReducers({
  currentUser: currentUserReducer,
  employees: employeesReducer,
  users: usersReducer,
  clients: clientsReducer,
  warehouses: warehousesReducer,
});
