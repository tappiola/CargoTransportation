const { DataTypes, NOW } = require('sequelize');
const db = require('../database/db');

const LossReport = db.define('loss_report', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  reportedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: NOW,
  },
});

module.exports = LossReport;
