import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Employee from './Employee';
import EmployeesList from './EmployeesList';

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
