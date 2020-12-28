import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { Link } from '@material-ui/core';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUsers, deleteUsers } from '../../../redux/actions';
import { CustomGrid } from '../SharedComponents/DataGrid';
import { GridToolbar } from '../SharedComponents/GridToolbar';
import { DeleteButton, NavButton } from '../SharedComponents/Button';
import { useContainerStyles } from '../SharedComponents/Shared.styles';

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
    field: 'companyAccountNumber',
    headerName: 'УНП',
    flex: 1,
  },
];

function UsersList({
  usersData, usersLoadComplete, initUsers, removeUsers,
}) {
  const classes = useContainerStyles();
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    initUsers();
  }, []);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <GridToolbar title="Грузоперевозки">
        <NavButton color="primary" to="/users/new">Новый пользователь</NavButton>
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
  initUsers: () => dispatch(getUsers()),
  removeUsers: (ids) => dispatch(deleteUsers(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
