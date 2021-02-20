import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import CompaniesList from './CompaniesList';
import Company from './Company';

export default function Companies() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:id(\\d+)`} component={Company} />
      <Route path={`${path}/new`} component={Company} />
      <Route exact path={path} component={CompaniesList} />
      <Route>Страница не найдена</Route>
    </Switch>
  );
}
