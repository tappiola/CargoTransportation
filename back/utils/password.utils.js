const bcrypt = require('bcrypt'),
	logger = require('../config/logger'),
	generatePassword = require('password-generator');

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

module.exports.customPassword = () => {
	const maxLength = 15;
	const minLength = 8;
	const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}/;
	
	let password = '';
	const randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
	while ( !passwordRegExp.test(password) ) {
		password = generatePassword(randomLength, false, /[\w\d\?\-]/);
	}
	return password;
};
