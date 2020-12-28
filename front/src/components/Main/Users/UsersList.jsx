import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { usersGet, usersDelete } from '../../../redux/actions';
import { CustomGrid } from '../SharedComponents/DataGrid';

const columns = [
  {
    field: 'name',
    headerName: 'ФИО',
    disableClickEventBubbling: true,
    flex: 2,
    renderCell: (params) => (
      <Link component={NavLink} to={`/users/${params.row.id}`}>{params.value}</Link>
    ),
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 2,
    renderCell: (params) => <Link href={`mailto:${params.value}`} color="textPrimary">{params.value}</Link>,
  },
  {
    field: 'companyName',
    headerName: 'Компания',
    flex: 2,
  },
  {
    field: 'companyUnp',
    headerName: 'УНП',
    flex: 1,
  },
];

// Table toolbar
const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
  button: {
    whiteSpace: 'nowrap',
  },
}));

const TableToolbar = ({ title, selection, deleteAction }) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar
      className={classes.root}
    >
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.title} variant="h5" id="tableTitle" component="div" align="left">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.title} id="tableButtons" component="div" align="right">
            <ButtonGroup variant="contained">
              <Button
                className={classes.button}
                color="primary"
                component={NavLink}
                to="/users/new"
              >
                Новый пользователь
              </Button>
              <Button
                color="secondary"
                disabled={selection.length === 0}
                onClick={deleteAction}
              >
                Удалить
              </Button>
            </ButtonGroup>
          </Typography>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  selection: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteAction: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function UsersList({
  usersData, usersLoadComplete, initUsers, deleteUsers,
}) {
  const classes = useStyles();
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    initUsers();
  }, []);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <TableToolbar
        title="Пользователи"
        selection={selection}
        deleteAction={() => deleteUsers(selection)}
      />
      <CustomGrid
        rows={usersData}
        columns={columns}
        loading={!usersLoadComplete}
        onSelectionChange={(newSelection) => {
          setSelection(newSelection.rowIds);
        }}
      />
    </Container>
  );
}

const mapStateToProps = ({ user: { usersData, usersLoadComplete } }) => (
  {
    usersData, usersLoadComplete,
  }
);

const mapDispatchToProps = (dispatch) => ({
  initUsers: () => dispatch(usersGet()),
  deleteUsers: (ids) => dispatch(usersDelete(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
