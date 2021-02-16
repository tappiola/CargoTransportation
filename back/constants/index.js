const ROLES = {
  GLOBAL_ADMIN: 'global_admin',
  ADMIN: 'admin',
  DRIVER: 'driver',
  MANAGER: 'manager',
  DISPATCHER: 'dispatcher',
};

const CONTROL_POINT_STATUSES = {
  EXPECTED: 'Не пройдена',
  PASSED: 'Пройдена',
};

const CONTROL_POINT_STATUSES_ID = {
  EXPECTED: 1,
  PASSED: 2,
};

const ALL_ROLES = Object.values(ROLES);

const CONSIGNMENT_NOTES_STATUSES = {
  ACCEPTED: 'Принята',
  ISSUED: 'Оформлена',
  VERIFIED: 'Проверка завершена',
  COMPLETED: 'Перевозка завершена',
};

const CONSIGNMENT_NOTES_STATUSES_ID = {
  ACCEPTED: 1,
  ISSUED: 2,
  VERIFIED: 3,
  COMPLETED: 5,
};

const WAYBILL_STATUSES = {
  ISSUED: 'Оформлена',
  STARTED: 'Перевозка начата',
  COMPLETED: 'Перевозка завершена',
  IN_PROCESS: 'В процессе оформления',
};

const WAYBILL_STATUSES_ID = {
  STARTED: 1,
  COMPLETED: 2,
  ISSUED: 3,
  IN_PROCESS: 4,
};


const SOCKET_STATUSES = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
};

const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

module.exports = {
  ROLES,
  ALL_ROLES,
  TOAST_TYPES,
  SOCKET_STATUSES,
  WAYBILL_STATUSES,
  WAYBILL_STATUSES_ID,
  CONTROL_POINT_STATUSES,
  CONTROL_POINT_STATUSES_ID,
  CONSIGNMENT_NOTES_STATUSES,
  CONSIGNMENT_NOTES_STATUSES_ID,
};
