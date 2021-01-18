const userRouter = require('../controllers/userСontroller');
const employeeRouter = require('../controllers/employeeController');

module.exports = (app) => {
  app.use('/api/users', userRouter);
  app.use('/api/employees', employeeRouter);
};
