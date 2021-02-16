import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { ConfirmDialog } from '@tappiola/material-ui-externals';

import { dispatchDeleteEmployees, dispatchGetEmployees } from './employeesSlice';
import DeleteButton from 'components/Buttons/DeleteButton';
import NavButton from 'components/Buttons/NavButton';
import CustomGrid from 'components/DataGrid';
import * as COLUMNS from 'components/DataGrid/gridColumns';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';

function EmployeesList() {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const [selection, setSelection] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { employeesData, employeesLoadComplete } = useSelector(({ employees }) => employees);

  const columns = [
    COLUMNS.FULLNAME(path),
    COLUMNS.EMAIL,
    COLUMNS.ROLE,
    COLUMNS.STATUS,
  ];

  useEffect(() => {
    dispatch(dispatchGetEmployees());
  }, []);

  return (
    <>
      <PaddedContainer>
        <GridToolbar title="Сотрудники">
          <NavButton color="primary" to={`${path}/new`}>Добавить сотрудника</NavButton>
          <DeleteButton disabled={!selection.length} onClick={() => setIsDialogOpen(true)} />
        </GridToolbar>
        <CustomGrid
          rows={employeesData}
          columns={columns}
          loading={!employeesLoadComplete}
          onSelectionChange={(newSelection) => setSelection(newSelection.rowIds)}
        />
      </PaddedContainer>
      {isDialogOpen && (
        <ConfirmDialog
          title="Удаление сотрудников"
          description="Вы уверены, что хотите удалить выбранных сотрудников?"
          onPopupClose={() => setIsDialogOpen(false)}
          onActionConfirm={() => {
            setIsDialogOpen(false);
            dispatch(dispatchDeleteEmployees(selection));
            setSelection([]);
          }}
        />
      )}
    </>
  );
}

export default EmployeesList;
