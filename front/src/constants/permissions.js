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
  DISPATCHER: 'dispatcher',
};

const ROLE_NAMES = {
  [ROLES.DRIVER]: 'Водитель',
  [ROLES.ADMIN]: ' Администратор',
  [ROLES.MANAGER]: 'Менеджер',
  [ROLES.GLOBAL_ADMIN]: 'Системный администратор',
  [ROLES.DISPATCHER]: 'Диспетчер',
};

export const CONSIGMENT_NOTES_STATUSES = {
  ACCEPTED: 'Принята',
  ISSUED: 'Оформлена',
  VERIFIED: 'Проверка завершена',
  COMPLITED: 'Перевозка завершена',
};

export const CONSIGMENT_NOTES_STATUSES_ID = {
  ACCEPTED: 1,
  ISSUED: 2,
  VERIFIED: 3,
  COMPLITED: 5,
};

export const WAYBILL_STATUSES = {
  ISSUED: 'Оформлена',
  STARTED: 'Перевозка начата',
  COMPLITED: 'Перевозка завершена',
  IN_PROCESS: 'В процессе оформления',
};

export const WAYBILL_STATUSES_ID = {
  STARTED: 1,
  COMPLITED: 2,
  ISSUED: 3,
  IN_PROCESS: 4,
};

export { MODULE_NAMES, ROLES, ROLE_NAMES };
