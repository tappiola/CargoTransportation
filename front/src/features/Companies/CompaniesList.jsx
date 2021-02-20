import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { ConfirmDialog } from '@tappiola/material-ui-externals';

import { getCompanies } from './companiesSlice';
import DeleteButton from 'components/Buttons/DeleteButton';
import NavButton from 'components/Buttons/NavButton';
import CustomGrid from 'components/DataGrid';
import * as COLUMNS from 'components/DataGrid/gridColumns';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';

function CompaniesList() {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const [selection, setSelection] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const companiesData = useSelector(({ companies }) => companies.companiesData);
  const companiesLoadComplete = useSelector(({ companies }) => companies.companiesLoadComplete);

  useEffect(() => {
    dispatch(getCompanies());
  }, []);

  const columns = [
    COLUMNS.COMPANIES_NAME,
    COLUMNS.COMPANIES_UNN,
  ];

  return (
    <>
      <PaddedContainer>
        <GridToolbar title="Компании">
          <NavButton color="primary" to={`${path}/new`}>Новая компания</NavButton>
          <DeleteButton disabled={!selection.length} onClick={() => setIsDialogOpen(true)} />
        </GridToolbar>
        <CustomGrid
          rows={companiesData}
          columns={columns}
          loading={!companiesLoadComplete}
          onSelectionChange={(newSelection) => setSelection(newSelection.rowIds)}
        />
      </PaddedContainer>
      {isDialogOpen && (
        <ConfirmDialog
          title="Удаление компаний"
          description="Вы уверены, что хотите удалить выбранные компании?"
          onPopupClose={() => setIsDialogOpen(false)}
          // onActionConfirm={() => {
          //   setIsDialogOpen(false);
          //   dispatch(deleteUsers(selection));
          //   setSelection([]);
          // }}
        />
      )}
    </>
  );
}

export default CompaniesList;
