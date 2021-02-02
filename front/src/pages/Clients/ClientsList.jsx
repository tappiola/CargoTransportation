import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { ConfirmDialog } from '@tappiola/material-ui-externals';

import DeleteButton from 'components/Buttons/DeleteButton';
import NavButton from 'components/Buttons/NavButton';
import CustomGrid from 'components/DataGrid';
import {
  FULLNAME, EMAIL, COMPANY, STATUS,
} from 'components/DataGrid/gridColumns';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';
import { dispatchDeleteClients, dispatchGetClients } from 'redux/actions';

function ClientsList() {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const { clientsData, clientsLoadComplete } = useSelector(({ clients }) => clients);
  const [selection, setSelection] = useState([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const columns = [FULLNAME(path), EMAIL, COMPANY, STATUS];

  useEffect(() => {
    dispatch(dispatchGetClients());
  }, []);

  return (
    <>
      <PaddedContainer>
        <GridToolbar title="Клиенты">
          <NavButton color="primary" to={`${path}/new`}>Добавить клиента</NavButton>
          <DeleteButton
            isDisabled={selection.length === 0}
            onButtonClick={() => { setIsConfirmDialogOpen(true); }}
          />
        </GridToolbar>
        <CustomGrid
          rows={clientsData}
          columns={columns}
          loading={!clientsLoadComplete}
          onSelectionChange={({ rowIds }) => setSelection(rowIds)}
        />
      </PaddedContainer>
      {isConfirmDialogOpen && (
        <ConfirmDialog
          title="Удаление клиентов"
          description="Вы уверены, что хотите удалить выбранных клиентов?"
          onPopupClose={() => setIsConfirmDialogOpen(false)}
          onActionConfirm={() => {
            setIsConfirmDialogOpen(false);
            dispatch(dispatchDeleteClients(selection));
            setSelection([]);
          }}
        />
      )}
    </>
  );
}

export default ClientsList;
