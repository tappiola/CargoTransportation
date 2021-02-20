import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Act from './Act';
import ActsList from './ActsList';

export default function Employees() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:id(\\d+)`} component={Act} />
      <Route path={`${path}/new`} component={Act} />
      <Route exact path={path} component={ActsList} />
      <Route>Страница не найдена</Route>
    </Switch>
  );
}
