import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Client from './Client';
import ClientsList from './ClientsList';

export default function Employees() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:id(\\d+)`} component={Client} />
      <Route path={`${path}/new`} component={Client} />
      <Route exact path={path} component={ClientsList} />
      <Route>Страница не найдена</Route>
    </Switch>
  );
}
