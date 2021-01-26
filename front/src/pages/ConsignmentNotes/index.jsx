import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import ConsignmentNote from './ConsignmentNote';
import ConsignmentNoteNew from './ConsignmentNoteNew';
import ConsignmentNotesList from './ConsignmentNotesList';

export default function ConsignmentNotes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:id(\\d+)`} component={ConsignmentNote} />
      <Route path={`${path}/new`} component={ConsignmentNoteNew} />
      <Route exact path={path} component={ConsignmentNotesList} />
      <Route>Страница не найдена</Route>
    </Switch>
  );
}
