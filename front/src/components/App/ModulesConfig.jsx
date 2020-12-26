import Acts from '../Main/Acts/Acts';
import Clients from '../Main/Clients/Clients';
import ConsignmentNotes from '../Main/ConsignmentNotes/ConsinmentNotes';
import Mailings from '../Main/Mailings/Mailings';
import Reports from '../Main/Reports/Reports';
import Users from '../Main/Users/Users';
import Warehouses from '../Main/Warehouses/Warehouses';
import Waybills from '../Main/Waybills/Waybills';
import { MODULES, ROLES } from '../../constants/permissions';

// TODO: temp config - ideally these settings should be stored in DB
const MODULES_CONFIG = {
  [MODULES.ACTS]: {
    basePath: '/acts', component: Acts, roles: [ROLES.GLOBAL_ADMIN],
  },
  [MODULES.CLIENTS]: {
    basePath: '/clients', component: Clients, roles: [ROLES.ADMIN],
  },
  [MODULES.CONSIGNMENT_NOTES]: {
    basePath: '/consignment-notes', component: ConsignmentNotes, roles: [ROLES.GLOBAL_ADMIN],
  },
  [MODULES.MAILINGS]: {
    basePath: '/mailings', component: Mailings, roles: [ROLES.GLOBAL_ADMIN, ROLES.ADMIN],
  },
  [MODULES.REPORTS]: {
    basePath: '/reports', component: Reports, roles: [ROLES.GLOBAL_ADMIN],
  },
  [MODULES.USERS]: {
    basePath: '/users', component: Users, roles: [ROLES.GLOBAL_ADMIN],
  },
  [MODULES.WAREHOUSES]: {
    basePath: '/warehouses', component: Warehouses, roles: [ROLES.GLOBAL_ADMIN],
  },
  [MODULES.WAYBILLS]: {
    basePath: '/waybills', component: Waybills, roles: [ROLES.GLOBAL_ADMIN],
  },
};

// TODO: This should be received from API, based on current auth state and configured permissions
// + we need to put this into Redux
const userInfo = {
  loggedIn: true,
  role: ROLES.GLOBAL_ADMIN,
};

// TODO: This should be in redux
const ALLOWED_MODULES = [];
// eslint-disable-next-line no-restricted-syntax
for (const [module, config] of Object.entries(MODULES_CONFIG)) {
  if (config.roles.includes(userInfo.role)) {
    ALLOWED_MODULES[module] = config;
  }
}

export { ALLOWED_MODULES };
