const dotenv = require('dotenv');
const fs = require('fs');
const logger = require('../config/logger');

module.exports = () =>
  fs.readFile('./.env.example', 'utf8', (err, example) => {
    if (err) {
      throw err;
    }

    const exmVars = Object.keys(dotenv.parse(Buffer.from(example)));
    const envVars = Object.keys(process.env);
    const unincluded = exmVars.filter((exmVar) => !envVars.includes(exmVar));

    if (unincluded.length) {
      throw new Error(
        `Not all variables included: ${JSON.stringify(unincluded)}`,
      );
    } else {
      logger.info('All variables included');
    }
  });
