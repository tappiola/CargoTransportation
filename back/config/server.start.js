const db = require('../database/db'),
	PORT = process.env.PORT || 5000,
	logger = require('../config/logger');

module.exports = async ( app ) => {
	try {
		await db.authenticate();
		logger.info('Database connected successfully');
		
		app.listen(PORT, () => {
			logger.info(`Server has started on port ${PORT}`);
		});
	} catch (e) {
		logger.error('Database connection FAILED');
		process.exit(1);
	}
};
