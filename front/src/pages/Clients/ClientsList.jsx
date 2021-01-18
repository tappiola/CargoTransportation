import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import DeleteButton from 'components/Buttons/DeleteButton';
import NavButton from 'components/Buttons/NavButton';
import ConfirmDialog from 'components/ConfirmDialog';
import CustomGrid from 'components/DataGrid';
import * as COLUMNS from 'components/DataGrid/gridColumns';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';
import { dispatchDeleteClients, dispatchGetClients } from 'redux/actions';

function ClientsList({
  clientsData, clientsLoadComplete, initClients, removeClients,
}) {
  const [selection, setSelection] = useState([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { path } = useRouteMatch();

  const columns = [
    COLUMNS.FULLNAME(path),
    COLUMNS.EMAIL,
    COLUMNS.COMPANY_NAME,
    COLUMNS.STATUS,
  ];

  useEffect(() => {
    initClients();
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
          onSelectionChange={(newSelection) => {
            setSelection(newSelection.rowIds);
          }}
        />
      </PaddedContainer>
      <ConfirmDialog
        title="Удаление клиентов"
        description="Вы уверены, что хотите удалить выбранных клиентов?"
        isOpen={isConfirmDialogOpen}
        onPopupClose={() => setIsConfirmDialogOpen(false)}
        onActionConfirm={() => {
          setIsConfirmDialogOpen(false);
          removeClients(selection);
        }}
      />
    </>
  );
}

const mapStateToProps = ({ clients: { clientsData, clientsLoadComplete } }) => (
  {
    clientsData, clientsLoadComplete,
  }
);

const mapDispatchToProps = (dispatch) => ({
  initClients: () => dispatch(dispatchGetClients()),
  removeClients: (ids) => dispatch(dispatchDeleteClients(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientsList);
