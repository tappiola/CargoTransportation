const { DataTypes } = require('sequelize');
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
  },
});

module.exports = LossReport;
