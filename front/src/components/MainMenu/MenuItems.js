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
import {AllowedPaths} from '../App/App';
import PropTypes from "prop-types";

const PATHS_TO_MENU_ITEMS = [
    {position: 0, path: '/clients', menuItemName: 'Клиенты', icon: PeopleIcon},
    {position: 1, path: '/warehouses', menuItemName: 'Склады', icon: ShoppingCartIcon},
    {position: 2, path: '/acts', menuItemName: 'Акты', icon: ReportIcon},
    {position: 3, path: '/waybills', menuItemName: 'Путевые листы', icon: LocalShippingIcon},
    {position: 4, path: '/reports', menuItemName: 'Отчеты', icon: BarChartIcon},
    {position: 5, path: '/consignment-notes', menuItemName: 'ТТН', icon: AssignmentIcon},
    {position: 6, path: '/users', menuItemName: 'Пользователи', icon: AccountBoxIcon},
    {position: 7, path: '/mailings', menuItemName: 'Рассылки', icon: EmailIcon},
]

export function MenuItems() {
    return <div>
        {PATHS_TO_MENU_ITEMS
            .filter(i => AllowedPaths.includes(i.path))
            .sort((a, b) => a.position - b.position)
            .map(i => {
                const Icon = i.icon;
                return <ListItem key={i.path.slice(1)} button component="a" href={i.path}>
                    <ListItemIcon>
                        <Icon/>
                    </ListItemIcon>
                    <ListItemText primary={i.menuItemName}/>
                </ListItem>
            })
        }
    </div>
}

MenuItems.propTypes = {
  children: PropTypes.node,
};
