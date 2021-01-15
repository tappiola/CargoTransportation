const db = require('../database/db');
const User = require('./User');
const Company = require('./Company');
const Role = require('./Role');
const Endpoint = require('./Endpoint');
const Client = require('./Client');
const Warehouse = require('./Warehouse');
const Vehicle = require('./Vehicle');
const Documents = require('./Documents');
const { ConsignmentNote, ConsignmentNoteStatus } = require('./ConsignmentNote');
const { Good, GoodStatus } = require('./Good');
const { Waybill, WaybillStatus } = require('./Waybill');
const { ControlPoint, ControlPointStatus } = require('./ControlPoint');
const LossReport = require('./LossReport');
const CongratulationTemplate = require('./CongratulationTemplate');

User.belongsTo(Company);

const UserRole = db.define('user_role', {});
User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

const RolePermission = db.define('role_permission', {});
Endpoint.belongsToMany(Role, { through: RolePermission });
Role.belongsToMany(Endpoint, { through: RolePermission });

Client.belongsTo(Company, { as: 'linkedCompany' });
Warehouse.belongsTo(Company, { as: 'linkedCompany' });

Documents.belongsTo(User);

ConsignmentNote.belongsTo(ConsignmentNoteStatus);
ConsignmentNote.belongsTo(Client);
ConsignmentNote.belongsTo(Warehouse);
ConsignmentNote.belongsTo(Vehicle);
ConsignmentNote.belongsTo(User, { as: 'driver' });
ConsignmentNote.belongsTo(User, { as: 'createdBy' });
ConsignmentNote.belongsTo(User, { as: 'assignedTo' });

Good.belongsTo(GoodStatus);
Good.belongsTo(User, { as: 'checkedBy' });
Good.belongsTo(ConsignmentNote);

Waybill.belongsTo(WaybillStatus);
Waybill.belongsTo(ConsignmentNote);

ControlPoint.belongsTo(ControlPointStatus);
ControlPoint.belongsTo(Waybill);

LossReport.belongsTo(Good);
LossReport.belongsTo(User, { as: 'responsible' });

CongratulationTemplate.belongsTo(Company, { as: 'linkedCompany' });

db.sync({ alter: true }).then(() => {
  console.log('DB sync completed');
});

module.exports = {
  User,
  Company,
  Role,
  Endpoint,
  Client,
  Warehouse,
  Vehicle,
  Documents,
  Good,
  Waybill,
  LossReport,
};
