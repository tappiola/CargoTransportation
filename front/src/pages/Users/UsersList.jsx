import * as COLUMNS from 'components/DataGrid/gridColumns';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { dispatchDeleteUsers, dispatchGetUsers } from 'redux/actions';
import { useRouteMatch } from 'react-router-dom';
import { usersSelector } from 'redux/selectors/users';
import ConfirmDialog from 'components/ConfirmDialog';
import { useRouteMatch } from 'react-router-dom';
import { dispatchGetUsers, dispatchDeleteUsers } from 'redux/actions';
import CustomGrid from 'components/DataGrid';
import DeleteButton from 'components/Buttons/DeleteButton';
import GridToolbar from 'components/GridToolbar';
import NavButton from 'components/Buttons/NavButton';
import PaddedContainer from 'components/PaddedContainer';
import React, { useEffect, useState } from 'react';
import * as COLUMNS from 'components/DataGrid/gridColumns';
import { usersSelector } from 'redux/selectors/users';
import ConfirmDialog from 'components/ConfirmDialog';

function UsersList({
  usersData, usersLoadComplete, initUsers, removeUsers,
}) {
  const [selection, setSelection] = useState([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { path } = useRouteMatch();

  const columns = [
    COLUMNS.FULLNAME(path),
    COLUMNS.EMAIL,
    COLUMNS.COMPANY,
    COLUMNS.UNN,
    COLUMNS.STATUS,
  ];

  useEffect(() => {
    initUsers();
  }, []);

  return (
    <>
      <PaddedContainer>
        <GridToolbar title="Пользователи">
          <NavButton color="primary" to={`${path}/new`}>Новый пользователь</NavButton>
          <DeleteButton
            isDisabled={selection.length === 0}
            onButtonClick={() => { setIsConfirmDialogOpen(true); }}
          />
        </GridToolbar>
        <CustomGrid
          rows={usersData}
          columns={columns}
          loading={!usersLoadComplete}
          onSelectionChange={(newSelection) => {
            setSelection(newSelection.rowIds);
          }}
        />
      </PaddedContainer>
      <ConfirmDialog
        title="Удаление пользователей"
        description="Вы уверены, что хотите удалить выбранных пользователей?"
        isOpen={isConfirmDialogOpen}
        onPopupClose={() => setIsConfirmDialogOpen(false)}
        onActionConfirm={() => {
          setIsConfirmDialogOpen(false);
          removeUsers(selection);
        }}
      />
    </>
  );
}

const mapStateToProps = ({ users: { usersData, usersLoadComplete } }) => (
  {
    usersData: usersSelector(usersData),
    usersLoadComplete,
  }
);

const mapDispatchToProps = (dispatch) => ({
  initUsers: () => dispatch(dispatchGetUsers()),
  removeUsers: (ids) => dispatch(dispatchDeleteUsers(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
