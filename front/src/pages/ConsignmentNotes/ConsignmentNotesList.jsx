import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { Button } from '@material-ui/core';
import { ConfirmDialog } from '@tappiola/material-ui-externals';

import DeleteButton from 'components/Buttons/DeleteButton';
import NavButton from 'components/Buttons/NavButton';
import CustomGrid from 'components/DataGrid';
import * as COLUMNS from 'components/DataGrid/gridColumns';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';
import { ROLES } from 'constants/permissions';
import { dispatchDeleteConsignmentNotes, dispatchGetConsignmentNotes, dispatchConfirmConsigmentNote } from 'redux/actions';

function ConsignmentNotesList() {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const [selection, setSelection] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAproveDialogOpen, setIsAproveDialogOpen] = useState(false);
  const { consignmentNotesData, consignmentNotesLoadComplete } = useSelector(
    ({ consignmentNotes }) => consignmentNotes,
  );
  const isManager = useSelector(({ currentUser }) => currentUser.roles.includes(ROLES.MANAGER));

  const columns = [
    COLUMNS.TNN_NUMBER(path),
    COLUMNS.TTN_CLIENT,
    COLUMNS.TTN_MANAGER,
    COLUMNS.TTN_DRIVER,
    COLUMNS.TTN_STATUS,
  ];

  useEffect(() => {
    dispatch(dispatchGetConsignmentNotes());
  }, []);

  return (
    <>
      <PaddedContainer>
        <GridToolbar title="ТТН">
          <NavButton color="primary" to={`${path}/new`}>
            Добавить ТТН
          </NavButton>
          <DeleteButton
            isDisabled={selection.length === 0}
            onButtonClick={() => setIsDeleteDialogOpen(true)}
          />
          {isManager && (
            <Button
              color="primary"
              disabled={selection.length === 0}
              onClick={() => setIsAproveDialogOpen(true)}
            >
              Отметить как проверенная
            </Button>
          )}
        </GridToolbar>
        <CustomGrid
          rows={consignmentNotesData}
          columns={columns}
          loading={!consignmentNotesLoadComplete}
          onSelectionChange={(newSelection) => {
            setSelection(newSelection.rowIds);
          }}
        />
      </PaddedContainer>
      {isDeleteDialogOpen && (
        <ConfirmDialog
          title="Удаление ТТН"
          description="Вы уверены, что хотите удалить выбранные ТТН?"
          onPopupClose={() => setIsDeleteDialogOpen(false)}
          onActionConfirm={() => {
            setIsDeleteDialogOpen(false);
            dispatch(dispatchDeleteConsignmentNotes(selection));
          }}
        />
      )}
      {isAproveDialogOpen && (
        <ConfirmDialog
          title="Проверка ТТН"
          description="Вы уверены, что хотите пометить выбранные ТТН как ПРОВЕРЕННЫЕ?"
          onPopupClose={() => setIsAproveDialogOpen(false)}
          onActionConfirm={() => {
            setIsAproveDialogOpen(false);
            dispatch(dispatchConfirmConsigmentNote(selection));
          }}
        />
      )}
    </>
  );
}

export default ConsignmentNotesList;
