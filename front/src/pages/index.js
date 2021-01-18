import Employees from './Employees';
import { MODULE_NAMES, ROLES } from 'constants/permissions';
import Acts from 'pages/Acts';
import Clients from 'pages/Clients';
import ConsignmentNotes from 'pages/ConsinmentNotes';
import Mailings from 'pages/Mailings';
import Reports from 'pages/Reports';
import Users from 'pages/Users';
import Warehouses from 'pages/Warehouses';
import Waybills from 'pages/Waybills';

const {
  GLOBAL_ADMIN, MANAGER, ADMIN, DRIVER, DISPATCHER,
} = ROLES;

export const PROTECTED_ROUTES = [
  {
    module: MODULE_NAMES.ACTS,
    basePath: '/acts',
    component: Acts,
    roles: [GLOBAL_ADMIN, MANAGER, DRIVER],
  },
  {
    module: MODULE_NAMES.CLIENTS,
    basePath: '/clients',
    component: Clients,
    roles: [ADMIN],
  },
  {
    module: MODULE_NAMES.CONSIGNMENT_NOTES,
    basePath: '/consignment-notes',
    component: ConsignmentNotes,
    roles: [GLOBAL_ADMIN, MANAGER, DISPATCHER, ADMIN],
  },
  {
    module: MODULE_NAMES.MAILINGS,
    basePath: '/mailings',
    component: Mailings,
    roles: [GLOBAL_ADMIN, ADMIN],
  },
  {
    module: MODULE_NAMES.REPORTS,
    basePath: '/reports',
    component: Reports,
    roles: [GLOBAL_ADMIN, MANAGER],
  },
  {
    module: MODULE_NAMES.USERS,
    basePath: '/users',
    component: Users,
    roles: [GLOBAL_ADMIN],
  },
  {
    module: MODULE_NAMES.EMPLOYEES,
    basePath: '/employees',
    component: Employees,
    roles: [ADMIN],
  },
  {
    module: MODULE_NAMES.WAREHOUSES,
    basePath: '/warehouses',
    component: Warehouses,
    roles: [GLOBAL_ADMIN, ADMIN, DISPATCHER, MANAGER],
  },
  {
    module: MODULE_NAMES.WAYBILLS,
    basePath: '/waybills',
    component: Waybills,
    roles: [GLOBAL_ADMIN, ADMIN, DRIVER, MANAGER],
  },
];
