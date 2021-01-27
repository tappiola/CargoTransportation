const userRouter = require('../controllers/userСontroller');
const employeeRouter = require('../controllers/employeeController');
const clientRouter = require('../controllers/clientController');
const warehouseRouter = require('../controllers/warehouseController');
const consignmentNoteRouter = require('../controllers/consignmentNoteController');
const waybillRouter = require('../controllers/waybillController');
const elasticRouter = require('../controllers/elasticController');
const documentController = require('../controllers/documentController');

module.exports = (app) => {
  app.use('/api/elastic', elasticRouter);
  app.use('/api/users', userRouter);
  app.use('/api/employees', employeeRouter);
  app.use('/api/clients', clientRouter);
  app.use('/api/warehouses', warehouseRouter);
  app.use('/api/consignment-notes', consignmentNoteRouter);
  app.use('/api/waybills', waybillRouter);
  app.use('/api/documents', documentController);
};
