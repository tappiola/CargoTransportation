const { DataTypes } = require('sequelize');
const db = require('../database/db');
const User = require('./User');

const Documents = db.define('document', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  passportNumber: {
    type: DataTypes.STRING,
  },
  passportIssuedBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passportIssuedAt: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: User,
      key: 'id'
    }
  }
});

module.exports = Documents;
