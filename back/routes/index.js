const userRouter = require('./users');
const employeeRouter = require('./employees');

module.exports = app => {
	app.use('/users', userRouter);
	app.use('/employees', employeeRouter);
};
