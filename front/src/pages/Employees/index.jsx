import { Route, Switch, useRouteMatch } from 'react-router-dom';
import React from 'react';
import EmployeesList from './EmployeesList';
import Employee from './Employee';

export default function Employees() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:id(\\d+)`} component={Employee} />
      <Route path={`${path}/new`} component={Employee} />
      <Route exact path={path} component={EmployeesList} />
      <Route>Страница не найдена</Route>
    </Switch>
  );
}
