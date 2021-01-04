const db = require('../database/db'),
  PORT = process.env.PORT || 5000,
  Logger = require('../config/logger');

module.exports = async ( app ) => {
  try {
    await db.authenticate();
    await db.sync({ alter : true });
    Logger.info('Database connected successfully');
    
    app.listen(PORT, () => {
      Logger.info(`Server has started on port ${PORT}`);
    });
  } catch (e) {
    Logger.error('Database connection FAILED');
    process.exit(1);
  }
};
