const { DataTypes } = require('sequelize');
const db = require('../database/db');

const Vehicle = db.define('vehicle', {
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

module.exports = Vehicle;
