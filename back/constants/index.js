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

const WAYBILL_STATUSES_ID = {
  STARTED: 1,
  COMPLETED: 2,
  ISSUED: 3,
  IN_PROCESS: 4,
};
module.exports = { ROLES, WAYBILL_STATUSES_ID, CONTROL_POINT_STATUSES, CONTROL_POINT_STATUSES_ID };
