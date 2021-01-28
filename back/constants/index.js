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

module.exports = { ROLES, CONSIGMENT_NOTES_STATUSES, CONSIGMENT_NOTES_STATUSES_ID };
