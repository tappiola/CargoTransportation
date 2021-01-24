import React, { useContext, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import DoneIcon from '@material-ui/icons/DoneAllTwoTone';
import EditIcon from '@material-ui/icons/EditOutlined';
import RevertIcon from '@material-ui/icons/NotInterestedOutlined';
import { ConfirmDialog, ToastQueueContext } from '@tappiola/material-ui-externals';

import { TOAST_TYPES } from '../../constants/toastsTypes';
import { useStyles } from './ControlledTable.styles';
import CustomTableCell from './CustomTableCell';

const CustomTableRow = (
  {
    rowIndex,
    row,
    onDelete,
    onRowChange,
    columnKeys,
    tableName,
    tableColumns,
    confirmDeleteTitle,
    confirmDeleteDescription,
  },
) => {
  const { trigger } = useFormContext();
  const { addToast } = useContext(ToastQueueContext);
  const classes = useStyles();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [previousData, setPreviousData] = useState(row);

  const onChange = (e, name) => {
    const newData = { [name]: e.target.value };
    onRowChange(newData);
  };

  const onCancel = ({ id, ...data }) => {
    if (Object.values(data).some((v) => v !== '')) {
      setIsEditMode(false);
      onRowChange(previousData);
    } else {
      onDelete();
    }
  };

  return (
    <>
      <TableRow key={row.id}>
        <TableCell className={classes.selectTableCell}>
          {isEditMode ? (
            <>
              <Tooltip title="Сохранить">
                <IconButton
                  aria-label="done"
                  onClick={() => {
                    trigger(columnKeys.map((k) => `${tableName}Rows[${rowIndex}][${k}]`))
                      .then((status) => {
                        if (status === true) {
                          setIsEditMode(false);
                        }
                      });
                  }}
                >
                  <DoneIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Отменить">
                <IconButton
                  aria-label="revert"
                  onClick={() => onCancel(row)}
                >
                  <RevertIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Редактировать">
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    setPreviousData(row);
                    setIsEditMode(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Удалить">
                <IconButton
                  aria-label="delete"
                  onClick={() => setIsConfirmDialogOpen(true)}
                >
                  <DeleteForeverOutlinedIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </TableCell>
        {tableColumns.map((c) => (
          <CustomTableCell {...{
            rowIndex,
            row,
            isEditMode,
            label: c.columnName,
            name: c.columnKey,
            onChange,
            key: c.columnKey,
            tableName,
          }}
          />
        ))}
      </TableRow>
      {isConfirmDialogOpen && (
      <ConfirmDialog
        title={confirmDeleteTitle}
        description={confirmDeleteDescription}
        onPopupClose={() => setIsConfirmDialogOpen(false)}
        onActionConfirm={() => {
          setIsConfirmDialogOpen(false);
          onDelete();
          addToast('Удалено успешно', TOAST_TYPES.SUCCESS);
        }}
      />
      )}
    </>
  );
};

export default CustomTableRow;
