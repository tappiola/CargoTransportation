const db = require('../database/db');
const User = require('./User');
const Company = require('./Company');
const Role = require('./Role');
const Endpoint = require('./Endpoint');

User.belongsTo(Company);

const UserRole = db.define('user_role', {});
User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

const RolePermission = db.define('role_permission', {});
Endpoint.belongsToMany(Role, { through: RolePermission });
Role.belongsToMany(Endpoint, { through: RolePermission });

db.sync({ alter: true }).then((r) => {
  console.log('DB sync completed');
});

module.exports = {
  User,
  Company,
  Role,
  Endpoint,
};
