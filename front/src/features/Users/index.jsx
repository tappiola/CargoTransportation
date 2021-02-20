import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import User from './User';
import UsersList from './UsersList';

export default function Users() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:id(\\d+)`} component={User} />
      <Route path={`${path}/new`} component={User} />
      <Route exact path={path} component={UsersList} />
      <Route>Страница не найдена</Route>
    </Switch>
  );
}
