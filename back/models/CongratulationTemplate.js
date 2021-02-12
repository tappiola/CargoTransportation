const { DataTypes } = require('sequelize');
const db = require('../database/db');

const CongratulationTemplate = db.define('congratulation_template', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING,
  },
});

module.exports = CongratulationTemplate;
