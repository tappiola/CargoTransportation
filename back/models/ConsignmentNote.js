const { DataTypes } = require('sequelize');
const db = require('../database/db');

const ConsignmentNoteStatus = db.define('consignment_note_status', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    unique: true,
  },
});

const ConsignmentNote = db.define('consignment_note', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  number: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  issuedAt: {
    type: DataTypes.DATEONLY,
  },
  revenue: {
    type: DataTypes.INTEGER,
  },
  vehicle: {
    type: DataTypes.TEXT,
  }
});

module.exports = { ConsignmentNote, ConsignmentNoteStatus };
