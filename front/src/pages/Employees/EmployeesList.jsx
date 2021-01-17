import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { ConfirmDialog } from '@tappiola/material-ui-externals';
import CustomGrid from 'components/DataGrid';
import GridToolbar from 'components/GridToolbar';
import DeleteButton from 'components/Buttons/DeleteButton';
import NavButton from 'components/Buttons/NavButton';
import { dispatchGetEmployees, dispatchDeleteEmployees } from 'redux/actions';
import * as COLUMNS from 'components/DataGrid/gridColumns';
import PaddedContainer from 'components/PaddedContainer';

function EmployeesList({
  employeesData, employeesLoadComplete, initEmployees, removeEmployees, companyId,
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
    initEmployees(companyId);
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

const mapStateToProps = ({ employees, currentUser }) => {
  const { employeesData, employeesLoadComplete } = employees;
  const { companyId } = currentUser;
  return {
    employeesData, employeesLoadComplete, companyId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  initEmployees: (id) => dispatch(dispatchGetEmployees(id)),
  removeEmployees: (ids) => dispatch(dispatchDeleteEmployees(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesList);
