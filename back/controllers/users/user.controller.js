const { hashPassword, isPasswordValid } = require('../../utils/password.utils');
const { getSignedToken } = require('../../utils/token.utils');
const Users = require('../../models/Users');

exports.index = async ( req, res ) => {
	const users = await Users.findAll();
	res.status(200).json(users);
};

exports.register = async ( req, res, next ) => {
	const { email, password } = req.body;
	const user = await Users.findOne({ email });
	
	if ( user ) {
		return res.status(400).json({ error : { message : 'Email already in use!' } });
	}
	
	try {
		const newUser = Users.create({ email, password : await hashPassword(password) });
		const token = getSignedToken(newUser);
		
		res.status(200).json({ token });
	} catch (e) {
		e.status = 400;
		next(e);
	}
};

exports.login = async ( req, res ) => {
	const { email, password } = req.body;
	const user = await Users.findOne({ email });
	
	if ( !user ) {
		return res.status(401).json({ error : { message : 'invalid email/password' } });
	}
	
	const isValid = isPasswordValid(password, user.password);
	if ( !isValid ) {
		return res.status(401).json({ error : { message : 'invalid password' } });
	}
	
	const token = getSignedToken(user);
	res.status(200).json({ token });
};
