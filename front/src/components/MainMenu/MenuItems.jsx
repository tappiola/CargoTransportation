import { MODULE_NAMES } from 'constants/permissions';
import { NavLink, useLocation } from 'react-router-dom';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BarChartIcon from '@material-ui/icons/BarChart';
import EmailIcon from '@material-ui/icons/Email';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PeopleIcon from '@material-ui/icons/People';
import React from 'react';
import ReportIcon from '@material-ui/icons/Report';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const menuItems = [
  {
    module: MODULE_NAMES.ACTS,
    basePath: '/acts',
  },
  {
    module: MODULE_NAMES.CLIENTS,
    basePath: '/clients',
  },
  {
    module: MODULE_NAMES.CONSIGNMENT_NOTES,
    basePath: '/consignment-notes',
  },
  {
    module: MODULE_NAMES.MAILINGS,
    basePath: '/mailings',
  },
  {
    module: MODULE_NAMES.REPORTS,
    basePath: '/reports',
  },
  {
    module: MODULE_NAMES.USERS,
    basePath: '/users',
  },
  {
    module: MODULE_NAMES.EMPLOYEES,
    basePath: '/employees',
  },
  {
    module: MODULE_NAMES.WAREHOUSES,
    basePath: '/warehouses',
  },
  {
    module: MODULE_NAMES.WAYBILLS,
    basePath: '/waybills',
  },
];

const MENU_ITEMS_CONFIG = {
  [MODULE_NAMES.CLIENTS]: {
    menuItemName: 'Клиенты', icon: PeopleIcon,
  },
  [MODULE_NAMES.ACTS]: {
    menuItemName: 'Акты', icon: ReportIcon,
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
};

export function MenuItems() {
  const { pathname } = useLocation();
  return (
    <div>
      {menuItems
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
