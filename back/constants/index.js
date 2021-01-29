const ROLES = {
  GLOBAL_ADMIN: 'global_admin',
  ADMIN: 'admin',
  DRIVER: 'driver',
  MANAGER: 'manager',
  DISPATCHER: 'dispatcher',
};

const CONSIGMENT_NOTES_STATUSES = {
  ACCEPTED: 'Принята',
  ISSUED: 'Оформлена',
  VERIFIED: 'Проверка завершена',
  COMPLITED: 'Перевозка завершена',
};

const CONSIGMENT_NOTES_STATUSES_ID = {
  ACCEPTED: 1,
  ISSUED: 2,
  VERIFIED: 3,
  COMPLITED: 5,
};

const WAYBILL_STATUSES = {
  ISSUED: 'Оформлена',
  STARTED: 'Перевозка начата',
  COMPLITED: 'Перевозка завершена',
  IN_PROCESS: 'В процессе оформления',
};

const WAYBILL_STATUSES_ID = {
  STARTED: 1,
  COMPLITED: 2,
  ISSUED: 3,
  IN_PROCESS: 4,
};

module.exports = { ROLES, CONSIGMENT_NOTES_STATUSES, CONSIGMENT_NOTES_STATUSES_ID, WAYBILL_STATUSES, WAYBILL_STATUSES_ID };
