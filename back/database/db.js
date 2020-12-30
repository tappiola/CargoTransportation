const dbConfig = require('../config/db.config');
const { Sequelize } = require('sequelize');

const db = new Sequelize(dbConfig.connectionString);
db.sync({ alter : true });

module.exports = new Sequelize(dbConfig.connectionString);
