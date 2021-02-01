import Employees from './Employees';
import { MODULE_NAMES, ROLES } from 'constants/permissions';
import { URLS } from 'constants/urls';
import Acts from 'pages/Acts';
import Clients from 'pages/Clients';
import ConsignmentNotes from 'pages/ConsignmentNotes';
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
    basePath: URLS.ACTS,
    component: Acts,
    roles: [MANAGER, DRIVER],
  },
  {
    module: MODULE_NAMES.CLIENTS,
    basePath: URLS.CLIENTS,
    component: Clients,
    roles: [ADMIN],
  },
  {
    module: MODULE_NAMES.CONSIGNMENT_NOTES,
    basePath: URLS.CONSIGNMENT_NOTES,
    component: ConsignmentNotes,
    roles: [MANAGER, DISPATCHER, ADMIN],
  },
  {
    module: MODULE_NAMES.MAILINGS,
    basePath: URLS.MAILINGS,
    component: Mailings,
    roles: [GLOBAL_ADMIN, ADMIN],
  },
  {
    module: MODULE_NAMES.REPORTS,
    basePath: URLS.REPORTS,
    component: Reports,
    roles: [MANAGER],
  },
  {
    module: MODULE_NAMES.USERS,
    basePath: URLS.USERS,
    component: Users,
    roles: [GLOBAL_ADMIN],
  },
  {
    module: MODULE_NAMES.EMPLOYEES,
    basePath: URLS.EMPLOYEES,
    component: Employees,
    roles: [ADMIN],
  },
  {
    module: MODULE_NAMES.WAREHOUSES,
    basePath: URLS.WAREHOUSES,
    component: Warehouses,
    roles: [ADMIN, DISPATCHER, MANAGER],
  },
  {
    module: MODULE_NAMES.WAYBILLS,
    basePath: URLS.WAYBILLS,
    component: Waybills,
    roles: [ADMIN, DRIVER, MANAGER],
  },
];
