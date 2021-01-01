const {DataTypes} = require('sequelize');
const db = require('../database/db');

const Role = db.define('role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        unique: true,
    },
});

module.exports = Role;
