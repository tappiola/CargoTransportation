import Acts from 'pages/Acts';
import Clients from 'pages/Clients';
import ConsignmentNotes from 'pages/ConsinmentNotes';
import Mailings from 'pages/Mailings';
import Reports from 'pages/Reports';
import Users from 'pages/Users';
import Warehouses from 'pages/Warehouses';
import Waybills from 'pages/Waybills';
import { MODULE_NAMES, ROLES } from 'constants/permissions';
import NewCompanyForm from '../components/NewCompanyForm';

export const PROTECTED_ROUTES = [
  {
    module: MODULE_NAMES.ACTS,
    basePath: '/acts',
    component: Acts,
    roles: [ROLES.GLOBAL_ADMIN],
  },
  {
    module: MODULE_NAMES.CLIENTS,
    basePath: '/clients',
    component: Clients,
    roles: [ROLES.ADMIN],
  },
  {
    module: MODULE_NAMES.CONSIGNMENT_NOTES,
    basePath: '/consignment-notes',
    component: ConsignmentNotes,
    roles: [ROLES.GLOBAL_ADMIN],
  },
  {
    module: MODULE_NAMES.MAILINGS,
    basePath: '/mailings',
    component: Mailings,
    roles: [ROLES.GLOBAL_ADMIN, ROLES.ADMIN],
  },
  {
    module: MODULE_NAMES.REPORTS,
    basePath: '/reports',
    component: Reports,
    roles: [ROLES.GLOBAL_ADMIN],
  },
  {
    module: MODULE_NAMES.USERS,
    basePath: '/users',
    component: Users,
    roles: [ROLES.GLOBAL_ADMIN],
  },
  {
    module: MODULE_NAMES.WAREHOUSES,
    basePath: '/warehouses',
    component: Warehouses,
    roles: [ROLES.GLOBAL_ADMIN],
  },
  {
    module: MODULE_NAMES.WAYBILLS,
    basePath: '/waybills',
    component: Waybills,
    roles: [ROLES.GLOBAL_ADMIN],
  },
  {
    module: 'NEW_COMPANY',
    basePath: '/new-company',
    component: NewCompanyForm,
    roles: [ROLES.GLOBAL_ADMIN, ROLES.ADMIN],
  },
];
