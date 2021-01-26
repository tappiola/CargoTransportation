const db = require('../database/db');

const PORT = process.env.PORT || 5000;
const Logger = require('./logger');
const checkEnvVariables = require('../utils/checkEnvVariables');

module.exports = async (app) => {
  try {
    await checkEnvVariables();

    await db.authenticate();
    Logger.info('Database connected successfully');

    app.listen(PORT, () => {
      Logger.info(`Server has started on port ${PORT}`);
    });
  } catch (e) {
    Logger.error('Database connection FAILED: ' + e );
    process.exit(1);
  }
};
