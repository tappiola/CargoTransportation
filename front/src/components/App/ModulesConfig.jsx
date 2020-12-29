import Acts from '../Main/Acts/Acts';
import Clients from '../Main/Clients/Clients';
import ConsignmentNotes from '../Main/ConsignmentNotes/ConsinmentNotes';
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
  },
  {
    module: MODULES.CLIENTS,
    basePath: '/clients',
    component: Clients,
    roles: [ROLES.ADMIN],
  },
  {
    module: MODULES.CONSIGNMENT_NOTES,
    basePath: '/consignment-notes',
    component: ConsignmentNotes,
    roles: [ROLES.GLOBAL_ADMIN],
  },
  {
    module: MODULES.MAILINGS,
    basePath: '/mailings',
    component: Mailings,
    roles: [ROLES.GLOBAL_ADMIN, ROLES.ADMIN],
  },
  {
    module: MODULES.REPORTS,
    basePath: '/reports',
    component: Reports,
    roles: [ROLES.GLOBAL_ADMIN],
  },
  {
    module: MODULES.USERS,
    basePath: '/users',
    component: Users,
    roles: [ROLES.GLOBAL_ADMIN],
  },
  {
    module: MODULES.WAREHOUSES,
    basePath: '/warehouses',
    component: Warehouses,
    roles: [ROLES.GLOBAL_ADMIN],
  },
  {
    module: MODULES.WAYBILLS,
    basePath: '/waybills',
    component: Waybills,
    roles: [ROLES.GLOBAL_ADMIN],
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
  .filter((module) => module.roles.includes(userInfo.role));
