import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { ConfirmDialog } from '@tappiola/material-ui-externals';

import { deleteWaybills, getWaybills } from './waybillsSlice';
import DeleteButton from 'components/Buttons/DeleteButton';
import NavButton from 'components/Buttons/NavButton';
import CustomGrid from 'components/DataGrid';
import * as COLUMNS from 'components/DataGrid/gridColumns';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';

export const waybillsSelector = ({ waybillsData }) => waybillsData.map((u) => {
  const { consignment_note: consignmentNote, ...other } = u;
  return { ...other, ...consignmentNote };
});

function WaybillsList() {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const [selection, setSelection] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const waybillsData = useSelector(({ waybills }) => waybillsSelector(waybills));
  const waybillsLoadComplete = useSelector(({ waybills }) => waybills.waybillsLoadComplete);

  const columns = [
    COLUMNS.WAYBILL_TTN(path),
    COLUMNS.DEPARTURE_DATE,
    COLUMNS.WAYBILL_START_ADDRESS,
    COLUMNS.WAYBILL_END_ADDRESS,
    COLUMNS.WAYBILL_STATUS,
  ];

  useEffect(() => {
    dispatch(getWaybills());
  }, []);

  return (
    <>
      <PaddedContainer>
        <GridToolbar title="Путевые листы">
          <NavButton color="primary" to={`${path}/new`}>Добавить путевой лист</NavButton>
          <DeleteButton disabled={!selection.length} onClick={() => setIsDialogOpen(true)} />
        </GridToolbar>
        <CustomGrid
          rows={waybillsData}
          columns={columns}
          loading={!waybillsLoadComplete}
          onSelectionChange={(newSelection) => setSelection(newSelection.rowIds)}
        />
      </PaddedContainer>
      {isDialogOpen && (
      <ConfirmDialog
        title="Удаление путевых листоы"
        description="Вы уверены, что хотите удалить выбранные путевые листы?"
        onPopupClose={() => setIsDialogOpen(false)}
        onActionConfirm={() => {
          setIsDialogOpen(false);
          dispatch(deleteWaybills(selection));
          setSelection([]);
        }}
      />
      )}
    </>
  );
}

export default WaybillsList;
