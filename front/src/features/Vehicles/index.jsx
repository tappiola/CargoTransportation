import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Vehicle from './Vehicle';
import VehiclesList from './VehiclesList';

export default function Vehicles() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:id(\\d+)`} component={Vehicle} />
      <Route path={`${path}/new`} component={Vehicle} />
      <Route exact path={path} component={VehiclesList} />
      <Route>Страница не найдена</Route>
    </Switch>
  );
}
