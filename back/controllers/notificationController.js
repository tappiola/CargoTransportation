const { toastEmmiter, EVENTS } = require('../constants/events');
const { TOAST_TYPES, SOCKET_STATUSES } = require('../constants');

const notificationController = (ws) => {
  toastEmmiter.on(EVENTS.CONSIGNMENT_NOTE_ADDED, () => {
    if (ws.readyState === SOCKET_STATUSES.OPEN) {
      ws.send(JSON.stringify({ type: TOAST_TYPES.INFO, message: 'Новая накладная' }));
    }
  });
  toastEmmiter.on(EVENTS.WAYBILL_CREATED, () => {
    if (ws.readyState === SOCKET_STATUSES.OPEN) {
      ws.send(JSON.stringify({ type: TOAST_TYPES.SUCCESS, message: 'Новый путевой лист' }));
    }
  });
};

module.exports = notificationController;
