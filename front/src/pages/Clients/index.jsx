import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Client from './Client';
import ClientsList from './ClientsList';
import React from 'react';

export default function Employees() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:id(\\d+)`} component={Client} />
      <Route path={`${path}/new`}>Страница добавления клиента </Route>
      <Route exact path={path} component={ClientsList} />
      <Route>Страница не найдена</Route>
    </Switch>
  );
}
