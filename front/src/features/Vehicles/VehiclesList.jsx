import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { ConfirmDialog } from '@tappiola/material-ui-externals';

import { getVehicles, deleteVehicles } from './vehiclesSlice';
import DeleteButton from 'components/Buttons/DeleteButton';
import NavButton from 'components/Buttons/NavButton';
import CustomGrid from 'components/DataGrid';
import * as COLUMNS from 'components/DataGrid/gridColumns';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';

function VehiclesList() {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const [selection, setSelection] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const vehiclesData = useSelector(({ vehicles }) => vehicles.vehiclesData);
  const vehiclesLoadComplete = useSelector(({ vehicles }) => vehicles.vehiclesLoadComplete);

  useEffect(() => {
    dispatch(getVehicles());
  }, []);

  const columns = [
    COLUMNS.VEHICLES_NAME(path),
  ];

  return (
    <>
      <PaddedContainer>
        <GridToolbar title="Машины">
          <NavButton color="primary" to={`${path}/new`}>Новая машина</NavButton>
          <DeleteButton disabled={!selection.length} onClick={() => setIsDialogOpen(true)} />
        </GridToolbar>
        <CustomGrid
          rows={vehiclesData}
          columns={columns}
          loading={!vehiclesLoadComplete}
          onSelectionChange={(newSelection) => setSelection(newSelection.rowIds)}
        />
      </PaddedContainer>
      {isDialogOpen && (
        <ConfirmDialog
          title="Удаление машины"
          description="Вы уверены, что хотите удалить выбранные машины?"
          onPopupClose={() => setIsDialogOpen(false)}
          onActionConfirm={() => {
            setIsDialogOpen(false);
            dispatch(deleteVehicles(selection));
            setSelection([]);
          }}
        />
      )}
    </>
  );
}

export default VehiclesList;
