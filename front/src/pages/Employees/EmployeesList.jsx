import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import CustomGrid from 'components/DataGrid';
import GridToolbar from 'components/GridToolbar';
import DeleteButton from 'components/Buttons/DeleteButton';
import NavButton from 'components/Buttons/NavButton';
import { dispatchGetUsers, dispatchDeleteUsers } from '../../redux/actions';
import { useContainerStyles } from './EmployeesList.styles';
import * as COLUMNS from '../../components/DataGrid/gridColumns';

function EmployeesList({
  usersData, usersLoadComplete, initUsers, removeUsers,
}) {
  const classes = useContainerStyles();
  const [selection, setSelection] = useState([]);
  const { path } = useRouteMatch();

  const columns = [
    COLUMNS.FULLNAME(path),
    COLUMNS.EMAIL,
    COLUMNS.STATUS,
  ];

  useEffect(() => {
    initUsers();
  }, []);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <GridToolbar title="Сотрудники">
        <NavButton color="primary" to={`${path}/new`}>Добавить сотрудника</NavButton>
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

const mapStateToProps = ({ users: { usersData, usersLoadComplete } }) => (
  {
    usersData, usersLoadComplete,
  }
);

const mapDispatchToProps = (dispatch) => ({
  initUsers: () => dispatch(dispatchGetUsers()),
  removeUsers: (ids) => dispatch(dispatchDeleteUsers(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesList);
