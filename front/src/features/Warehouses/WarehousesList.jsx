import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { ConfirmDialog } from '@tappiola/material-ui-externals';

import { dispatchDeleteWarehouses, dispatchGetWarehouses } from './warehousesSlice';
import DeleteButton from 'components/Buttons/DeleteButton';
import NavButton from 'components/Buttons/NavButton';
import CustomGrid from 'components/DataGrid';
import * as COLUMNS from 'components/DataGrid/gridColumns';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';

function WarehousesList() {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const [selection, setSelection] = useState([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { warehousesData, warehousesLoadComplete } = useSelector(({ warehouses }) => warehouses);

  const columns = [
    COLUMNS.LEGAL_NAME(path),
    COLUMNS.EMAIL,
    COLUMNS.ADDRESS,
    COLUMNS.IS_TRUSTED,
  ];

  useEffect(() => {
    dispatch(dispatchGetWarehouses());
  }, []);

  return (
    <>
      <PaddedContainer>
        <GridToolbar title="Склады">
          <NavButton color="primary" to={`${path}/new`}>Добавить склад</NavButton>
          <DeleteButton
            isDisabled={selection.length === 0}
            onButtonClick={() => { setIsConfirmDialogOpen(true); }}
          />
        </GridToolbar>
        <CustomGrid
          rows={warehousesData}
          columns={columns}
          loading={!warehousesLoadComplete}
          onSelectionChange={(newSelection) => {
            setSelection(newSelection.rowIds);
          }}
        />
      </PaddedContainer>
      {isConfirmDialogOpen && (
        <ConfirmDialog
          title="Удаление складов"
          description="Вы уверены, что хотите удалить выбранные склады?"
          onPopupClose={() => setIsConfirmDialogOpen(false)}
          onActionConfirm={() => {
            setIsConfirmDialogOpen(false);
            dispatch(dispatchDeleteWarehouses(selection));
            setSelection([]);
          }}
        />
      )}
    </>
  );
}

export default WarehousesList;
