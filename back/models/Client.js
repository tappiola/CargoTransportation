const { DataTypes } = require('sequelize');
const db = require('../database/db');

const Client = db.define('client', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    min: 3,
  },
  lastName: {
    type: DataTypes.STRING,
    min: 3,
  },
  middleName: {
    type: DataTypes.STRING,
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.lastName} ${this.firstName} ${this.middleName}`;
    },
  },
  companyName: {
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
  birthday: {
    type: DataTypes.DATEONLY,
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
      return `${this.country}, г. ${this.city}, ул. ${this.street}, ${this.house}`;
    },
  },
  isActive: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = Client;
