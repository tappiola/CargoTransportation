import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { ConfirmDialog } from '@tappiola/material-ui-externals';

import DeleteButton from 'components/Buttons/DeleteButton';
import NavButton from 'components/Buttons/NavButton';
import CustomGrid from 'components/DataGrid';
import * as COLUMNS from 'components/DataGrid/gridColumns';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';
import { dispatchDeleteEmployees, dispatchGetEmployees } from 'redux/actions';

function EmployeesList({
  employeesData, employeesLoadComplete, initEmployees, removeEmployees,
}) {
  const [selection, setSelection] = useState([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
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
    <>
      <PaddedContainer>
        <GridToolbar title="Сотрудники">
          <NavButton color="primary" to={`${path}/new`}>Добавить сотрудника</NavButton>
          <DeleteButton
            isDisabled={selection.length === 0}
            onButtonClick={() => { setIsConfirmDialogOpen(true); }}
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
      </PaddedContainer>
      {isConfirmDialogOpen && (
        <ConfirmDialog
          title="Удаление сотрудников"
          description="Вы уверены, что хотите удалить выбранных сотрудников?"
          onPopupClose={() => {
            setIsConfirmDialogOpen(false);
          }}
          onActionConfirm={() => {
            setIsConfirmDialogOpen(false);
            removeEmployees(selection);
          }}
        />
      )}
    </>
  );
}

const mapStateToProps = ({ employees }) => {
  const { employeesData, employeesLoadComplete } = employees;
  return { employeesData, employeesLoadComplete };
};

const mapDispatchToProps = (dispatch) => ({
  initEmployees: () => dispatch(dispatchGetEmployees()),
  removeEmployees: (ids) => dispatch(dispatchDeleteEmployees(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesList);
