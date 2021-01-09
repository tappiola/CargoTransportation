import * as COLUMNS from 'components/DataGrid/gridColumns';
import { connect } from 'react-redux';
import { dispatchDeleteConsignmentNotes, dispatchGetConsignmentNotes } from 'redux/actions';
import { useRouteMatch } from 'react-router-dom';
import ConfirmDialog from 'components/ConfirmDialog';
import CustomGrid from 'components/DataGrid';
import DeleteButton from 'components/Buttons/DeleteButton';
import GridToolbar from 'components/GridToolbar';
import NavButton from 'components/Buttons/NavButton';
import PaddedContainer from 'components/PaddedContainer';
import React, { useEffect, useState } from 'react';

function ConsignmentNotesList({
  consignmentNotesData, consignmentNotesLoadComplete, initConsignmentNotes, removeConsignmentNotes,
}) {
  const [selection, setSelection] = useState([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { path } = useRouteMatch();

  const columns = [
    COLUMNS.TNN_NUMBER(path),
    COLUMNS.TTN_CLIENT,
    COLUMNS.TTN_ADDRESS,
    COLUMNS.TTN_MANAGER,
    COLUMNS.TTN_DRIVER,
    COLUMNS.TTN_STATUS,
  ];

  useEffect(() => {
    initConsignmentNotes();
  }, []);

  return (
    <>
      <PaddedContainer>
        <GridToolbar title="ТТН">
          <NavButton color="primary" to={`${path}/new`}>Добавить ТТН</NavButton>
          <DeleteButton
            isDisabled={selection.length === 0}
            onButtonClick={() => { setIsConfirmDialogOpen(true); }}
          />
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
      <ConfirmDialog
        title="Удаление ТТН"
        description="Вы уверены, что хотите удалить выбранные ТТН?"
        isOpen={isConfirmDialogOpen}
        onPopupClose={() => setIsConfirmDialogOpen(false)}
        onActionConfirm={() => {
          setIsConfirmDialogOpen(false);
          removeConsignmentNotes(selection);
        }}
      />
    </>
  );
}

const mapStateToProps = (
  {
    consignmentNotes: {
      consignmentNotesData, consignmentNotesLoadComplete,
    },
  },
) => (
  {
    consignmentNotesData, consignmentNotesLoadComplete,
  }
);

const mapDispatchToProps = (dispatch) => ({
  initConsignmentNotes: () => dispatch(dispatchGetConsignmentNotes()),
  removeConsignmentNotes: (ids) => dispatch(dispatchDeleteConsignmentNotes(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConsignmentNotesList);
