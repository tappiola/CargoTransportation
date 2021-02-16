const { DataTypes } = require('sequelize');
const db = require('../database/db');
const { emitter, EVENTS } = require('../constants/events');

const WaybillStatus = db.define('waybill_status', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
  },
});

const Waybill = db.define('waybill', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  departedAt: {
    type: DataTypes.DATE,
  },
  expectedArrivalAt: {
    type: DataTypes.DATE,
  },
  country: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  street: {
    type: DataTypes.STRING,
  },
  house: {
    type: DataTypes.STRING,
  },
  fullAddress: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.country}, ${this.city}, ${this.street} ${this.house}`;
    },
  },
});

Waybill.afterCreate(() => {
  emitter.emit(EVENTS.WAYBILL_CREATED);
});

module.exports = { Waybill, WaybillStatus };
