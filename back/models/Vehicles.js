const { DataTypes } = require('sequelize');
const db = require('../database/db');

const Vehicles = db.define('vehicles', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    unique: true,
  },
});

module.exports = Vehicles;
