const userRouter = require('../controllers/userСontroller');
const employeeRouter = require('../controllers/employeeController');
const clientRouter = require('../controllers/clientController');
const warehouseRouter = require('../controllers/warehouseController');

module.exports = (app) => {
  app.use('/users', userRouter);
  app.use('/employees', employeeRouter);
  app.use('/clients', clientRouter);
  app.use('/warehouses', warehouseRouter);
};
