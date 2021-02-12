const Emitter = require('events');

const toastEmmiter = new Emitter();

const EVENTS = {
  CONSIGNMENT_NOTE_ADDED: 'CONSIGNMENT_NOTE_ADDED',
  WAYBILL_CREATED: 'WAYBILL_CREATED',
};

module.exports = { EVENTS, toastEmmiter };
