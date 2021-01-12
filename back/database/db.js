const dbConfig = require('../config/db.config');
const {Sequelize} = require('sequelize');

const db = new Sequelize(dbConfig, {logging: false});

module.exports = db;
