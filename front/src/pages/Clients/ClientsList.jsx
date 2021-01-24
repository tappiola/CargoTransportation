import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { ConfirmDialog } from '@tappiola/material-ui-externals';

import DeleteButton from 'components/Buttons/DeleteButton';
import NavButton from 'components/Buttons/NavButton';
import CustomGrid from 'components/DataGrid';
import * as COLUMNS from 'components/DataGrid/gridColumns';
import ElasticField from 'components/ElasticField';
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

  const getClientLink = ({ id, companyName }) => (
    <NavButton to={`${path}/${id}`} style={{ whiteSpace: 'nowrap' }}>
      {companyName}
    </NavButton>
  );

  return (
    <>
      <PaddedContainer>
        <GridToolbar title="Клиенты">
          <NavButton color="primary" to={`${path}/new`}>Добавить клиента</NavButton>
          <DeleteButton
            isDisabled={selection.length === 0}
            onButtonClick={() => { setIsConfirmDialogOpen(true); }}
          />
          <ElasticField index="clients" field="companyName" renderOption={getClientLink} />
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
      {isConfirmDialogOpen && (
        <ConfirmDialog
          title="Удаление клиентов"
          description="Вы уверены, что хотите удалить выбранных клиентов?"
          onPopupClose={() => setIsConfirmDialogOpen(false)}
          onActionConfirm={() => {
            setIsConfirmDialogOpen(false);
            removeClients(selection);
          }}
        />
      )}
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
