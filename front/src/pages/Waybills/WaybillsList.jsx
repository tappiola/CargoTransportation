import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { ConfirmDialog } from '@tappiola/material-ui-externals';

import DeleteButton from 'components/Buttons/DeleteButton';
import NavButton from 'components/Buttons/NavButton';
import CustomGrid from 'components/DataGrid';
import * as COLUMNS from 'components/DataGrid/gridColumns';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';
import { dispatchDeleteWaybills, dispatchGetWaybills } from 'redux/actions';
import { waybillsSelector } from 'redux/selectors/waybills';

function WaybillsList() {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const [selection, setSelection] = useState([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const waybillsData = waybillsSelector(useSelector(({ waybills }) => waybills.waybillsData));
  const waybillsLoadComplete = useSelector(({ waybills }) => waybills.waybillsLoadComplete);

  const columns = [
    COLUMNS.WAYBILL_TTN(path),
    COLUMNS.DEPARTURE_DATE,
    COLUMNS.WAYBILL_START_ADDRESS,
    COLUMNS.WAYBILL_END_ADDRESS,
    COLUMNS.WAYBILL_STATUS,
  ];

  useEffect(() => {
    dispatch(dispatchGetWaybills());
  }, []);

  return (
    <>
      <PaddedContainer>
        <GridToolbar title="Путевые листы">
          <NavButton color="primary" to={`${path}/new`}>Добавить путевой лист</NavButton>
          <DeleteButton
            isDisabled={selection.length === 0}
            onButtonClick={() => { setIsConfirmDialogOpen(true); }}
          />
        </GridToolbar>
        <CustomGrid
          rows={waybillsData}
          columns={columns}
          loading={!waybillsLoadComplete}
          onSelectionChange={(newSelection) => {
            setSelection(newSelection.rowIds);
          }}
        />
      </PaddedContainer>
      {isConfirmDialogOpen && (
      <ConfirmDialog
        title="Удаление путевых листоы"
        description="Вы уверены, что хотите удалить выбранные путевые листы?"
        onPopupClose={() => setIsConfirmDialogOpen(false)}
        onActionConfirm={() => {
          setIsConfirmDialogOpen(false);
          dispatch(dispatchDeleteWaybills(selection));
        }}
      />
      )}
    </>
  );
}

export default WaybillsList;
