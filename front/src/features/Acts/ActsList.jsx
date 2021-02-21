import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { ConfirmDialog } from '@tappiola/material-ui-externals';

import { getReports, deleteReports } from './actSlice';
import DeleteButton from 'components/Buttons/DeleteButton';
import NavButton from 'components/Buttons/NavButton';
import CustomGrid from 'components/DataGrid';
import { REPORT_DATE, REPORT_RESPONSIBLE, REPORT_NUMBER, REPORT_COMPANY } from 'components/DataGrid/gridColumns';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';

export default function Reports() {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const { reportsData, reportsLoadComplete } = useSelector(({ reports }) => reports);
  const [selection, setSelection] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const columns = [REPORT_NUMBER(path), REPORT_COMPANY, REPORT_DATE, REPORT_RESPONSIBLE];

  useEffect(() => {
    dispatch(getReports());
  }, []);

  return (
    <>
      <PaddedContainer>
        <GridToolbar title="Акты">
          <NavButton color="primary" to={`${path}/new`}>Добавить акт</NavButton>
          <DeleteButton disabled={!selection.length} onClick={() => setIsOpen(true)} />
        </GridToolbar>
        <CustomGrid
          rows={reportsData}
          columns={columns}
          loading={!reportsLoadComplete}
          onSelectionChange={({ rowIds }) => setSelection(rowIds)}
        />
      </PaddedContainer>
      {isOpen && (
      <ConfirmDialog
        title="Удаление актов"
        description="Вы уверены, что хотите удалить выбранные акты?"
        onPopupClose={() => setIsOpen(false)}
        onActionConfirm={() => {
          setIsOpen(false);
          dispatch(deleteReports(selection));
          setSelection([]);
        }}
      />
      )}
    </>
  );
}
