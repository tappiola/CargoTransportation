import * as COLUMNS from '../../components/DataGrid/gridColumns';
import { connect } from 'react-redux';
import { dispatchDeleteClients, dispatchGetClients } from '../../redux/actions';
import { useRouteMatch } from 'react-router-dom';
import CustomGrid from 'components/DataGrid';
import DeleteButton from 'components/Buttons/DeleteButton';
import GridToolbar from 'components/GridToolbar';
import NavButton from 'components/Buttons/NavButton';
import PaddedContainer from '../../components/PaddedContainer';
import React, { useEffect, useState } from 'react';

function ClientsList({
  clientsData, clientsLoadComplete, initClients, removeClients,
}) {
  const [selection, setSelection] = useState([]);
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
    <PaddedContainer>
      <GridToolbar title="Клиенты">
        <NavButton color="primary" to={`${path}/new`}>Добавить клиента</NavButton>
        <DeleteButton
          isDisabled={selection.length === 0}
          onButtonClick={() => removeClients(selection)}
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
