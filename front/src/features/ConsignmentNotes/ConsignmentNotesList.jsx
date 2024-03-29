import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { ConfirmDialog } from '@tappiola/material-ui-externals';

import { deleteConsignmentNotes, getConsignmentNotes } from './consignmentNotesSlice';
import DeleteButton from 'components/Buttons/DeleteButton';
import NavButton from 'components/Buttons/NavButton';
import CustomGrid from 'components/DataGrid';
import * as COLUMNS from 'components/DataGrid/gridColumns';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';

function ConsignmentNotesList() {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const [selection, setSelection] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    consignmentNotesData,
    consignmentNotesLoadComplete,
  } = useSelector(({ consignmentNotes }) => consignmentNotes);

  const columns = [
    COLUMNS.TNN_NUMBER(path),
    COLUMNS.TTN_CLIENT,
    COLUMNS.TTN_MANAGER,
    COLUMNS.TTN_DRIVER,
    COLUMNS.TTN_STATUS,
    COLUMNS.TTN_WAYBILL,
  ];

  useEffect(() => {
    dispatch(getConsignmentNotes());
  }, []);

  return (
    <>
      <PaddedContainer>
        <GridToolbar title="ТТН">
          <NavButton color="primary" to={`${path}/new`}>Добавить ТТН</NavButton>
          <DeleteButton disabled={!selection.length} onClick={() => setIsDialogOpen(true)} />
        </GridToolbar>
        <CustomGrid
          rows={consignmentNotesData}
          columns={columns}
          loading={!consignmentNotesLoadComplete}
          onSelectionChange={(newSelection) => setSelection(newSelection.rowIds)}
        />
      </PaddedContainer>
      {isDialogOpen && (
        <ConfirmDialog
          title="Удаление ТТН"
          description="Вы уверены, что хотите удалить выбранные ТТН?"
          onPopupClose={() => setIsDialogOpen(false)}
          onActionConfirm={() => {
            setIsDialogOpen(false);
            dispatch(deleteConsignmentNotes(selection));
            setSelection([]);
          }}
        />
      )}
    </>
  );
}

export default ConsignmentNotesList;
