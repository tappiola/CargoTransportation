const dotenv = require('dotenv');
const fs = require('fs');
const Logger = require('../config/logger');

module.exports = () =>
  fs.readFile('./.env.example', 'utf8', (err, example) => {
    if (err) {
      throw err;
    }

    const exmBuffer = Buffer.from(example);
    const exmVars = Object.keys(dotenv.parse(exmBuffer));

    fs.readFile('./.env', 'utf8', (error, envirenment) => {
      if (error) {
        throw error;
      }

      const envBuffer = Buffer.from(envirenment);
      const envVars = Object.keys(dotenv.parse(envBuffer));

      const unincluded = envVars.filter((envVar) => !exmVars.includes(envVar));
      if (unincluded.length) {
        throw new Error(`Not all variables included in .env.example : ${JSON.stringify(unincluded)}`);
      } else {
        Logger.info('All variables included');
      }
    });
  });
