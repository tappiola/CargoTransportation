import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Waybill from './Waybill';
import WaybillsList from './WaybillsList';

export default function Warehouses() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:id(\\d+)`} component={Waybill} />
      <Route exact path={path} component={WaybillsList} />
      <Route>Страница не найдена</Route>
    </Switch>
  );
}
