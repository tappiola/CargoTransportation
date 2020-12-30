import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import {NavLink, useRouteMatch} from 'react-router-dom';
import { dispatchGetUsers, dispatchDeleteUsers } from '../../../redux/actions';
import { CustomGrid } from '../SharedComponents/DataGrid';
import { GridToolbar } from '../SharedComponents/GridToolbar';
import { DeleteButton, NavButton } from '../SharedComponents/Button';
import { useContainerStyles } from '../SharedComponents/Shared.styles';
import * as COLUMNS from '../SharedComponents/gridColumns';

const columns = [
  COLUMNS.FULLNAME,
  COLUMNS.EMAIL,
  COLUMNS.COMPANY,
  COLUMNS.UNN,
  COLUMNS.STATUS,
];

function UsersList({
  usersData, usersLoadComplete, initUsers, removeUsers,
}) {
  const classes = useContainerStyles();
  const [selection, setSelection] = useState([]);
  const { path } = useRouteMatch();

  useEffect(() => {
    initUsers();
  }, []);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <GridToolbar title="Пользователи">
        <NavButton color="primary" to={`${path}/new`}>Новый пользователь</NavButton>
        <DeleteButton
          isDisabled={selection.length === 0}
          onButtonClick={() => removeUsers(selection)}
        />
      </GridToolbar>
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
  initUsers: () => dispatch(dispatchGetUsers()),
  removeUsers: (ids) => dispatch(dispatchDeleteUsers(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
