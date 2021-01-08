import * as COLUMNS from '../../components/DataGrid/gridColumns';
import { connect } from 'react-redux';
import { dispatchDeleteWarehouses, dispatchGetWarehouses } from '../../redux/actions';
import { useRouteMatch } from 'react-router-dom';
import ConfirmDialog from '../../components/ConfirmDialog';
import CustomGrid from 'components/DataGrid';
import DeleteButton from 'components/Buttons/DeleteButton';
import GridToolbar from 'components/GridToolbar';
import NavButton from 'components/Buttons/NavButton';
import PaddedContainer from '../../components/PaddedContainer';
import React, { useEffect, useState } from 'react';

function WarehousesList({
  warehousesData, warehousesLoadComplete, initWarehouses, removeWarehouses,
}) {
  const [selection, setSelection] = useState([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { path } = useRouteMatch();

  const columns = [
    COLUMNS.LEGAL_NAME(path),
    COLUMNS.EMAIL,
    COLUMNS.ADDRESS,
    COLUMNS.IS_TRUSTED,
  ];

  useEffect(() => {
    initWarehouses();
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
      <ConfirmDialog
        title="Удаление складов"
        description="Вы уверены, что хотите удалить выбранные склады?"
        isOpen={isConfirmDialogOpen}
        onPopupClose={() => setIsConfirmDialogOpen(false)}
        onActionConfirm={() => {
          setIsConfirmDialogOpen(false);
          removeWarehouses(selection);
        }}
      />
    </>
  );
}

const mapStateToProps = ({ warehouses: { warehousesData, warehousesLoadComplete } }) => (
  {
    warehousesData, warehousesLoadComplete,
  }
);

const mapDispatchToProps = (dispatch) => ({
  initWarehouses: () => dispatch(dispatchGetWarehouses()),
  removeWarehouses: (ids) => dispatch(dispatchDeleteWarehouses(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WarehousesList);
