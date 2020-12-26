import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import {
  Route, Switch, useRouteMatch, useParams,
} from 'react-router-dom';
import DataTable from '../../Shared/DataTable';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

function UsersList() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <DataTable
        title="Пользователи"
      />
    </Container>
  );
}

function User() {
  const { id } = useParams();
  return `user ${id}`;
}

export default function Users() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:id`} component={User} />
      <Route component={UsersList} />
    </Switch>
  );
}
