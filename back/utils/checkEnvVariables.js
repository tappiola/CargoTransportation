const dotenv = require('dotenv');
const fs = require('fs');
const Logger = require('../config/logger');

module.exports = async () =>
  await fs.readFile('./.env.example', 'utf8', function (err, example) {
    if (err) {
      throw err;
    }

    const exmBuffer = Buffer.from(example);
    const exmVars = Object.keys(dotenv.parse(exmBuffer));

    fs.readFile('./.env', 'utf8', function (err, envirenment) {
      if (err) {
        throw err;
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
