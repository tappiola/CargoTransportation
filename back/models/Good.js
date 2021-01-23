const { DataTypes } = require('sequelize');
const db = require('../database/db');

const GoodStatus = db.define('good_status', {
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

const Good = db.define('good', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  unit: {
    type: DataTypes.STRING,
  },
  cost: {
    type: DataTypes.DOUBLE,
  },
  weight: {
    type: DataTypes.DOUBLE,
  },
  remarks: {
    type: DataTypes.STRING,
  },
  checkedAt: {
    type: DataTypes.DATE,
  },
});

module.exports = { Good, GoodStatus };
