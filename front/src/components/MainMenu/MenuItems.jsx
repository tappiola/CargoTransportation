import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ReportIcon from '@material-ui/icons/Report';
import EmailIcon from '@material-ui/icons/Email';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { NavLink, useLocation } from 'react-router-dom';
import { ALLOWED_MODULES } from '../App/ModulesConfig';
import { MODULES } from '../../constants/permissions';

const MENU_ITEMS_CONFIG = {
  [MODULES.CLIENTS]: {
    menuItemName: 'Клиенты', icon: PeopleIcon,
  },
  [MODULES.ACTS]: {
    menuItemName: 'Акты', icon: ReportIcon,
  },
  [MODULES.USERS]: {
    menuItemName: 'Пользователи', icon: AccountBoxIcon,
  },
  [MODULES.WAREHOUSES]: {
    menuItemName: 'Склады', icon: ShoppingCartIcon,
  },
  [MODULES.WAYBILLS]: {
    menuItemName: 'Путевые листы', icon: LocalShippingIcon,
  },
  [MODULES.CONSIGNMENT_NOTES]: {
    menuItemName: 'ТТН', icon: AssignmentIcon,
  },
  [MODULES.REPORTS]: {
    menuItemName: 'Отчеты', icon: BarChartIcon,
  },
  [MODULES.MAILINGS]: {
    menuItemName: 'Рассылки', icon: EmailIcon,
  },
};

export function MenuItems() {
  const { pathname } = useLocation();
  return (
    <div>
      {Object.entries(ALLOWED_MODULES)
        .map(([module, { basePath }]) => {
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
