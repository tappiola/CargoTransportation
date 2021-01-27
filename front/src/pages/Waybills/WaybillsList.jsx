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
import { dispatchDeleteWaybills, dispatchGetWaybills } from 'redux/actions';
import { waybillsSelector } from 'redux/selectors/waybills';

function WaybillsList({
  waybillsData, waybillsLoadComplete, initWaybills, removeWaybills,
}) {
  const [selection, setSelection] = useState([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { path } = useRouteMatch();

  const columns = [
    COLUMNS.WAYBILL_TTN(path),
    COLUMNS.DEPARTURE_DATE,
    COLUMNS.WAYBILL_START_ADDRESS,
    COLUMNS.WAYBILL_END_ADDRESS,
    COLUMNS.WAYBILL_STATUS,
  ];

  useEffect(() => {
    initWaybills();
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
            removeWaybills(selection);
            setSelection([]);
          }}
        />
      )}
    </>
  );
}

const mapStateToProps = ({ waybills: { waybillsData, waybillsLoadComplete } }) => (
  {
    waybillsData: waybillsSelector(waybillsData),
    waybillsLoadComplete,
  }
);

const mapDispatchToProps = (dispatch) => ({
  initWaybills: () => dispatch(dispatchGetWaybills()),
  removeWaybills: (ids) => dispatch(dispatchDeleteWaybills(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WaybillsList);
