import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { ConfirmDialog } from '@tappiola/material-ui-externals';

import { dispatchDeleteUsers, dispatchGetUsers } from './usersSlice';
import DeleteButton from 'components/Buttons/DeleteButton';
import NavButton from 'components/Buttons/NavButton';
import CustomGrid from 'components/DataGrid';
import * as COLUMNS from 'components/DataGrid/gridColumns';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';

export const usersSelector = ({ usersData }) => usersData.map((u) => {
  const { company, ...user } = u;
  return { ...user, ...company };
});

function UsersList() {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const [selection, setSelection] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const usersData = useSelector(({ users }) => usersSelector(users));
  const usersLoadComplete = useSelector(({ users }) => users.usersLoadComplete);

  useEffect(() => {
    dispatch(dispatchGetUsers());
  }, []);

  const columns = [
    COLUMNS.FULLNAME(path),
    COLUMNS.EMAIL,
    COLUMNS.COMPANY,
    COLUMNS.UNN,
    COLUMNS.STATUS,
  ];

  useEffect(() => {
    dispatch(dispatchGetUsers());
  }, []);

  return (
    <>
      <PaddedContainer>
        <GridToolbar title="Пользователи">
          <NavButton color="primary" to={`${path}/new`}>Новый пользователь</NavButton>
          <DeleteButton disabled={!selection.length} onClick={() => setIsDialogOpen(true)} />
        </GridToolbar>
        <CustomGrid
          rows={usersData}
          columns={columns}
          loading={!usersLoadComplete}
          onSelectionChange={(newSelection) => setSelection(newSelection.rowIds)}
        />
      </PaddedContainer>
      {isDialogOpen && (
        <ConfirmDialog
          title="Удаление пользователей"
          description="Вы уверены, что хотите удалить выбранных пользователей?"
          onPopupClose={() => setIsDialogOpen(false)}
          onActionConfirm={() => {
            setIsDialogOpen(false);
            dispatch(dispatchDeleteUsers(selection));
            setSelection([]);
          }}
        />
      )}
    </>
  );
}

export default UsersList;
