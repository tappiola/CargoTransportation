const dbConfig = require( './db.config' );
const { Sequelize } = require( 'sequelize' );

module.exports = new Sequelize( dbConfig.connectionString );