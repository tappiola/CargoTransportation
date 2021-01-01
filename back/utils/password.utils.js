const bcrypt = require('bcrypt'),
	logger = require('../config/logger');

module.exports.hashPassword = async value => {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(value, salt);
};

module.exports.isPasswordValid = ( value, password ) => {
	try {
		return bcrypt.compare(value, password);
	} catch (error) {
		logger.error(error);
	}
};
