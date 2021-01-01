import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import CustomGrid from 'components/DataGrid';
import GridToolbar from 'components/GridToolbar';
import DeleteButton from 'components/Buttons/DeleteButton';
import NavButton from 'components/Buttons/NavButton';
import { dispatchGetEmployees, dispatchDeleteEmployees } from '../../redux/actions';
import { useContainerStyles } from './EmployeesList.styles';
import * as COLUMNS from '../../components/DataGrid/gridColumns';

function EmployeesList({
  employeesData, employeesLoadComplete, initEmployees, removeEmployees,
}) {
  const classes = useContainerStyles();
  const [selection, setSelection] = useState([]);
  const { path } = useRouteMatch();

  const columns = [
    COLUMNS.FULLNAME(path),
    COLUMNS.EMAIL,
    COLUMNS.ROLE,
    COLUMNS.STATUS,

  ];

  useEffect(() => {
    initEmployees();
  }, []);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <GridToolbar title="Сотрудники">
        <NavButton color="primary" to={`${path}/new`}>Добавить сотрудника</NavButton>
        <DeleteButton
          isDisabled={selection.length === 0}
          onButtonClick={() => removeEmployees(selection)}
        />
      </GridToolbar>
      <CustomGrid
        rows={employeesData}
        columns={columns}
        loading={!employeesLoadComplete}
        onSelectionChange={(newSelection) => {
          setSelection(newSelection.rowIds);
        }}
      />
    </Container>
  );
}

const mapStateToProps = ({ employees: { employeesData, employeesLoadComplete } }) => (
  {
    employeesData, employeesLoadComplete,
  }
);

const mapDispatchToProps = (dispatch) => ({
  initEmployees: () => dispatch(dispatchGetEmployees()),
  removeEmployees: (ids) => dispatch(dispatchDeleteEmployees(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesList);
