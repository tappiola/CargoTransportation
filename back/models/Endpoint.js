const { DataTypes } = require('sequelize');
const db = require('../database/db');

const Endpoint = db.define('endpoint', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  uri: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  menuPosition: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
});

module.exports = Endpoint;
