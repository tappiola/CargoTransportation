const MODULE_NAMES = {
  CLIENTS: 'CLIENTS',
  ACTS: 'ACTS',
  USERS: 'USERS',
  WAREHOUSES: 'WAREHOUSES',
  CONSIGNMENT_NOTES: 'CONSIGNMENT_NOTES',
  WAYBILLS: 'WAYBILLS',
  REPORTS: 'REPORTS',
  MAILINGS: 'MAILINGS',
  EMPLOYEES: 'EMPLOYEES',
};

// object values should correspond to role names in DB, table 'role'
const ROLES = {
  GLOBAL_ADMIN: 'global_admin',
  ADMIN: 'admin',
  DRIVER: 'driver',
  MANAGER: 'manager',
};
const ROLE_NAMES = {
  [ROLES.DRIVER]: 'Водитель',
  [ROLES.ADMIN]: ' Администратор',
  [ROLES.MANAGER]: 'Менеджер',
  [ROLES.GLOBAL_ADMIN]: 'Системный администратор',
};

export { MODULE_NAMES, ROLES, ROLE_NAMES };
