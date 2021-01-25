const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config');

module.exports = new Sequelize(
  dbConfig, {
    define: {
      timestamps: false,
    },
    logging: false,
    dialectOptions: {
        ssl: (process.env.NODE_ENV !== 'production')
    }
  },
);
