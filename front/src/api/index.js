export { fetchAPI } from './fetchAPI';
export {
  setUser, updateUser, getUsers, signIn, deleteUsers, updateToken,
} from './users';
export {
  getEmployees, getEmployeesWithRole, deleteEmployees, setEmployee, updateEmployee,
} from './employees';
export {
  getClients, deleteClients, setClient, updateClient,
} from './clients';
export {
  getWarehouses, deleteWarehouses, setWarehouse, updateWarehouse, getWarehouse,
} from './warehouses';
export { getWaybills, deleteWaybills, precreateWaybill } from './waybills';
export {
  getConsignmentNotes,
  getConsignmentNote,
  deleteConsignmentNotes,
  createConsignmentNote,
  aproveConsignmentNote,
} from './consignmentNotes';
export { getDocuments } from './documents';
