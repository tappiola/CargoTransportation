const ROLES = {
  GLOBAL_ADMIN: 'global_admin',
  ADMIN: 'admin',
  DRIVER: 'driver',
  MANAGER: 'manager',
  DISPATCHER: 'dispatcher',
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

module.exports = { ROLES, ALL_ROLES, CONSIGNMENT_NOTES_STATUSES, CONSIGNMENT_NOTES_STATUSES_ID, WAYBILL_STATUSES, WAYBILL_STATUSES_ID };
