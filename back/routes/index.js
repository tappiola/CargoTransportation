const userRouter = require('../controllers/userСontroller');
const employeeRouter = require('../controllers/employeeController');

module.exports = (app) => {
  app.use('/users', userRouter);
  app.use('/employees', employeeRouter);
};
