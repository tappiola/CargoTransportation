const userRouter = require('../controllers/userСontroller');

module.exports = app => {
	app.use('/users', userRouter);
};
