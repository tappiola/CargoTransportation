const db = require('../database/db');

const PORT = process.env.PORT || 5000;
const Logger = require('./logger');

module.exports = async (app) => {
  try {
    await db.authenticate();
    Logger.info('Database connected successfully');

    app.listen(PORT, () => {
      Logger.info(`Server has started on port ${PORT}`);
    });
  } catch (e) {
    Logger.error('Database connection FAILED');
    process.exit(1);
  }
};
