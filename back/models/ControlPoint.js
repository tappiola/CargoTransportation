const { DataTypes } = require('sequelize');
const db = require('../database/db');

const ControlPointStatus = db.define('control_point_status', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    unique: true,
  },
});

const ControlPoint = db.define('control_point', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.TEXT,
  },
  expectedArrivalAt: {
    type: DataTypes.DATE,
  },
});

module.exports = { ControlPoint, ControlPointStatus };
