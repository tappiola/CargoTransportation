const dbConfig = require('../config/db.config');
const { Sequelize } = require('sequelize');

module.exports = new Sequelize(dbConfig.connectionString);
