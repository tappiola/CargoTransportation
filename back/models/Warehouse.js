const { DataTypes } = require('sequelize');
const db = require('../database/db');

const Warehouse = db.define('warehouse', {
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
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  country: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  street: {
    type: DataTypes.STRING,
  },
  house: {
    type: DataTypes.STRING,
  },
  fullAddress: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.country}, ${this.city}, ${this.street} ${this.house}`;
    },
  },
  isTrusted: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = Warehouse;
