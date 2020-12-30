import Acts from '../Main/Acts/Acts';
import Clients from '../Main/Clients/Clients';
import ConsignmentNotes from '../Main/ConsignmentNotes/ConsinmentNotes';
import Employees from "../Main/Employees";
import Mailings from '../Main/Mailings/Mailings';
import Reports from '../Main/Reports/Reports';
import Users from '../Main/Users';
import Warehouses from '../Main/Warehouses/Warehouses';
import Waybills from '../Main/Waybills/Waybills';
import { MODULES, ROLES } from '../../constants/permissions';

// TODO: temp config - ideally these settings should be stored in DB
const MODULES_CONFIG = [
  {
    module: MODULES.ACTS,
    basePath: '/acts',
    component: Acts,
    roles: [ROLES.GLOBAL_ADMIN],
    position: 6,
  },
  {
    module: MODULES.CLIENTS,
    basePath: '/clients',
    component: Clients,
    roles: [ROLES.ADMIN],
    position: 1,
  },
  {
    module: MODULES.CONSIGNMENT_NOTES,
    basePath: '/consignment-notes',
    component: ConsignmentNotes,
    roles: [ROLES.GLOBAL_ADMIN],
    position: 3,
  },
  {
    module: MODULES.MAILINGS,
    basePath: '/mailings',
    component: Mailings,
    roles: [ROLES.GLOBAL_ADMIN, ROLES.ADMIN],
    position: 7,
  },
  {
    module: MODULES.REPORTS,
    basePath: '/reports',
    component: Reports,
    roles: [ROLES.GLOBAL_ADMIN],
    position: 5,
  },
  {
    module: MODULES.USERS,
    basePath: '/users',
    component: Users,
    roles: [ROLES.GLOBAL_ADMIN],
    position: 0,
  },
  {
    module: MODULES.WAREHOUSES,
    basePath: '/warehouses',
    component: Warehouses,
    roles: [ROLES.GLOBAL_ADMIN],
    position: 2,
  },
  {
    module: MODULES.WAYBILLS,
    basePath: '/waybills',
    component: Waybills,
    roles: [ROLES.GLOBAL_ADMIN],
    position: 4,
  },
    {
    module: MODULES.EMPLOYEES,
    basePath: '/employees',
    component: Employees,
    roles: [ROLES.GLOBAL_ADMIN],
    position: 4,
  },
];

// TODO: This should be received from API, based on current auth state and configured permissions
// + we need to put this into Redux
const userInfo = {
  loggedIn: true,
  role: ROLES.GLOBAL_ADMIN,
};

// TODO: This should be in redux
export const ALLOWED_MODULES = MODULES_CONFIG
  .filter((module) => module.roles.includes(userInfo.role))
  .sort((a, b) => a.position - b.position);
