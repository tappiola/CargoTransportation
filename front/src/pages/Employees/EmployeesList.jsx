import * as COLUMNS from 'components/DataGrid/gridColumns';
import { connect } from 'react-redux';
import { dispatchDeleteEmployees, dispatchGetEmployees } from 'redux/actions';
import { useRouteMatch } from 'react-router-dom';
import ConfirmDialog from 'components/ConfirmDialog';
import CustomGrid from 'components/DataGrid';
import DeleteButton from 'components/Buttons/DeleteButton';
import GridToolbar from 'components/GridToolbar';
import NavButton from 'components/Buttons/NavButton';
import PaddedContainer from 'components/PaddedContainer';
import React, { useEffect, useState } from 'react';

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
      <ConfirmDialog
        title="Удаление сотрудников"
        description="Вы уверены, что хотите удалить выбранных сотрудников?"
        isOpen={isConfirmDialogOpen}
        onPopupClose={() => setIsConfirmDialogOpen(false)}
        onActionConfirm={() => {
          setIsConfirmDialogOpen(false);
          removeEmployees(selection);
        }}
      />
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
