const { DataTypes } = require('sequelize');
const db = require('../database/db');

const Documents = db.define('document', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  passportNumber: {
    type: DataTypes.STRING,
    unique: true,
  },
  passportIssuedBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passportIssuedAt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Documents;
