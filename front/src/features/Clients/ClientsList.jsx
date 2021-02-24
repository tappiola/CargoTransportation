import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { ConfirmDialog } from '@tappiola/material-ui-externals';

import { deleteClients, getClients } from './clientsSlice';
import DeleteButton from 'components/Buttons/DeleteButton';
import NavButton from 'components/Buttons/NavButton';
import CustomGrid from 'components/DataGrid';
import { FULLNAME, EMAIL, COMPANY, STATUS } from 'components/DataGrid/gridColumns';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';

function ClientsList() {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const { clientsData, clientsLoadComplete } = useSelector(({ clients }) => clients);
  const [selection, setSelection] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const columns = [FULLNAME(path), COMPANY, EMAIL, STATUS];

  useEffect(() => {
    dispatch(getClients());
  }, []);

  return (
    <>
      <PaddedContainer>
        <GridToolbar title="Клиенты">
          <NavButton color="primary" to={`${path}/new`}>Добавить клиента</NavButton>
          <DeleteButton disabled={!selection.length} onClick={() => setIsOpen(true)} />
        </GridToolbar>
        <CustomGrid
          rows={clientsData}
          columns={columns}
          loading={!clientsLoadComplete}
          onSelectionChange={({ rowIds }) => setSelection(rowIds)}
        />
      </PaddedContainer>
      {isOpen && (
        <ConfirmDialog
          title="Удаление клиентов"
          description="Вы уверены, что хотите удалить выбранных клиентов?"
          onPopupClose={() => setIsOpen(false)}
          onActionConfirm={() => {
            setIsOpen(false);
            dispatch(deleteClients(selection));
            setSelection([]);
          }}
        />
      )}
    </>
  );
}

export default ClientsList;
