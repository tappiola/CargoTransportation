const { DataTypes } = require('sequelize');
const db = require('../database/db');

const Company = db.define('company', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  unn: {
    type: DataTypes.INTEGER,
    unique: true,
  },
});

module.exports = Company;
