import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BarChartIcon from '@material-ui/icons/BarChart';
import BusinessIcon from '@material-ui/icons/Business';
import EmailIcon from '@material-ui/icons/Email';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PeopleIcon from '@material-ui/icons/People';
import ReportIcon from '@material-ui/icons/Report';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { MODULE_NAMES } from 'constants/permissions';
import { URLS } from 'constants/urls';

const menuItems = [
  {
    module: MODULE_NAMES.ACTS,
    basePath: URLS.ACTS,
  },
  {
    module: MODULE_NAMES.CLIENTS,
    basePath: URLS.CLIENTS,
  },
  {
    module: MODULE_NAMES.CONSIGNMENT_NOTES,
    basePath: URLS.CONSIGNMENT_NOTES,
  },
  {
    module: MODULE_NAMES.MAILINGS,
    basePath: URLS.MAILINGS,
  },
  {
    module: MODULE_NAMES.REPORTS,
    basePath: URLS.REPORTS,
  },
  {
    module: MODULE_NAMES.COMPANIES,
    basePath: URLS.COMPANIES,
  },
  {
    module: MODULE_NAMES.USERS,
    basePath: URLS.USERS,
  },
  {
    module: MODULE_NAMES.EMPLOYEES,
    basePath: URLS.EMPLOYEES,
  },
  {
    module: MODULE_NAMES.WAREHOUSES,
    basePath: URLS.WAREHOUSES,
  },
  {
    module: MODULE_NAMES.WAYBILLS,
    basePath: URLS.WAYBILLS,
  },
  {
    module: MODULE_NAMES.VEHICLES,
    basePath: URLS.VEHICLES,
  },
];

const MENU_ITEMS_CONFIG = {
  [MODULE_NAMES.CLIENTS]: {
    menuItemName: 'Клиенты', icon: PeopleIcon,
  },
  [MODULE_NAMES.ACTS]: {
    menuItemName: 'Акты', icon: ReportIcon,
  },
  [MODULE_NAMES.COMPANIES]: {
    menuItemName: 'Компании', icon: BusinessIcon,
  },
  [MODULE_NAMES.USERS]: {
    menuItemName: 'Пользователи', icon: AccountBoxIcon,
  },
  [MODULE_NAMES.EMPLOYEES]: {
    menuItemName: 'Сотрудники', icon: AccountBoxIcon,
  },
  [MODULE_NAMES.WAREHOUSES]: {
    menuItemName: 'Склады', icon: ShoppingCartIcon,
  },
  [MODULE_NAMES.WAYBILLS]: {
    menuItemName: 'Путевые листы', icon: LocalShippingIcon,
  },
  [MODULE_NAMES.CONSIGNMENT_NOTES]: {
    menuItemName: 'ТТН', icon: AssignmentIcon,
  },
  [MODULE_NAMES.REPORTS]: {
    menuItemName: 'Отчеты', icon: BarChartIcon,
  },
  [MODULE_NAMES.MAILINGS]: {
    menuItemName: 'Рассылки', icon: EmailIcon,
  },
  [MODULE_NAMES.VEHICLES]: {
    menuItemName: 'Машины', icon: LocalShippingIcon,
  },
};

export function MenuItems({ modules }) {
  const { pathname } = useLocation();
  return (
    <div>
      {menuItems
        .filter(({ module }) => modules.includes(module))
        .map(({ module, basePath }) => {
          const itemConfig = MENU_ITEMS_CONFIG[module];
          const Icon = itemConfig.icon;
          return (
            <ListItem
              selected={pathname.startsWith(basePath)}
              key={basePath.slice(1)}
              button
              component={NavLink}
              to={basePath}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={itemConfig.menuItemName} />
            </ListItem>
          );
        })}
    </div>
  );
}
