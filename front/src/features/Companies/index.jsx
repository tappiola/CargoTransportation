import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import CompaniesList from './CompaniesList';

export default function Companies() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={CompaniesList} />
      <Route>Страница не найдена</Route>
    </Switch>
  );
}
