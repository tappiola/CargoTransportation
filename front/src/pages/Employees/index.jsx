import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Employee2 from './Employee';
import EmployeesList from './EmployeesList';

export default function Employees() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:id(\\d+)`} component={Employee2} />
      <Route path={`${path}/new`} component={Employee2} />
      <Route exact path={path} component={EmployeesList} />
      <Route>Страница не найдена</Route>
    </Switch>
  );
}
