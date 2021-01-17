import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Warehouse from './Warehouse';
import WarehousesList from './WarehousesList';

export default function Warehouses() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:id(\\d+)`} component={Warehouse} />
      <Route path={`${path}/new`}>Страница добавления склада </Route>
      <Route exact path={path} component={WarehousesList} />
      <Route>Страница не найдена</Route>
    </Switch>
  );
}
