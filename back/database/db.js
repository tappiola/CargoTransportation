const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config');

module.exports = new Sequelize(
  'postgres://tdvtlztfvrjymr:af8e96097ffd91b875e1dd92be96b716b7b1ade9be0a5a3603088f9023118ad5@ec2-52-31-233-101.eu-west-1.compute.amazonaws.com:5432/degmpcd50qa2dh?ssl=true', {
    define: {
      timestamps: false,
    },
    logging: false,
  },
);
