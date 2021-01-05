import { Route, Switch, useRouteMatch } from 'react-router-dom';
import React from 'react';
import UsersList from './UsersList';
import User from './User';

export default function Users() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:id(\\d+)`} component={User} />
      <Route path={`${path}/new`}>Страница добавления пользователя </Route>
      <Route exact path={path} component={UsersList} />
      <Route>Страница не найдена</Route>
    </Switch>
  );
}
