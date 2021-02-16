import { lazy } from 'react';

import Employees from './Employees';
import { MODULE_NAMES, ROLES } from 'constants/permissions';
import { URLS } from 'constants/urls';

const Acts = lazy(() => import('pages/Acts'));
const Clients = lazy(() => import('pages/Clients'));
const ConsignmentNotes = lazy(() => import('pages/ConsignmentNotes'));
const Mailings = lazy(() => import('pages/Mailings'));
const Reports = lazy(() => import('pages/Reports'));
const Users = lazy(() => import('pages/Users'));
const Warehouses = lazy(() => import('pages/Warehouses'));
const Waybills = lazy(() => import('pages/Waybills'));

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
