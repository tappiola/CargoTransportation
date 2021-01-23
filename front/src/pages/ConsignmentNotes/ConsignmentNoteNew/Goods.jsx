import React, { useState, useEffect, useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import DoneIcon from '@material-ui/icons/DoneAllTwoTone';
import EditIcon from '@material-ui/icons/EditOutlined';
import RevertIcon from '@material-ui/icons/NotInterestedOutlined';
import makeStyles from '@material-ui/styles/makeStyles';
import { ConfirmDialog, ToastQueueContext } from '@tappiola/material-ui-externals';

import { TOAST_TYPES } from '../../../constants/toastsTypes';
import BaseField from 'components/ControlledField';

const TABLE_COLUMNS = [
  { columnKey: 'name', columnName: 'Наименование' },
  { columnKey: 'quantity', columnName: 'Кол-во' },
  { columnKey: 'unit', columnName: 'Единица измерения' },
  { columnKey: 'cost', columnName: 'Стоимость (руб)' },
  { columnKey: 'remarks', columnName: 'Примечания' },
];

const COLUMN_KEYS = TABLE_COLUMNS.reduce((prev, next) => [...prev, next.columnKey], []);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  formControl: {
    width: '100%',
  },
  table: {
    width: '100%',
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 130,
    height: 40,
  },
  input: {
    width: 130,
    height: 40,
  },
}));

const createData = (...values) => ({
  id: +new Date(),
  ...Object.fromEntries(COLUMN_KEYS.map((k, index) => ([k, values[index]]))),
});

const CustomTableCell = ({
  row, isEditMode, name, label, onChange,
}) => {
  const { register } = useFormContext();
  const classes = useStyles();
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <BaseField
          defaultValue={row[name]}
          name={name}
          placeholder={label}
          onInput={(e) => onChange(e, row)}
          className={classes.input}
          inputRef={register}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

const CustomTableRow = ({ row, onDelete, onRowChange }) => {
  const { trigger } = useFormContext();
  const { addToast } = useContext(ToastQueueContext);
  const classes = useStyles();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [currentData, setCurrentData] = useState({});

  const onChange = (e) => {
    const newData = { [e.target.name]: e.target.value };
    setCurrentData((data) => ({ ...data, ...newData }));
  };

  const onCancel = ({ id, ...data }) => {
    if (Object.values(data).some((v) => v !== '')) {
      setIsEditMode(false);
      setCurrentData({});
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
                    trigger(COLUMN_KEYS)
                      .then((status) => {
                        if (status === true) {
                          onRowChange(currentData);
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
        {TABLE_COLUMNS.map((c) => (
          <CustomTableCell {...{
            row, isEditMode, label: c.columnName, name: c.columnKey, onChange, key: c.columnKey,
          }}
          />
        ))}
      </TableRow>
      {isConfirmDialogOpen && (
      <ConfirmDialog
        title="Удаление товарной позиции"
        description="Вы уверены, что хотите удалить выбранный товар"
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

const Goods = () => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const {
    setValue, register, errors, clearErrors,
  } = useFormContext();

  useEffect(() => {
    register({ name: 'goods' });
  }, [register]);

  useEffect(() => {
    setValue('goods', rows);
  }, [rows]);

  const onDelete = (rowId) => {
    setRows((currentRows) => [...currentRows.filter((r) => r.id !== rowId)]);
  };

  const onRowAdd = () => {
    clearErrors();
    setRows((currentRows) => [...currentRows, createData('', '', '', '', '')]);
  };

  const onRowChange = (row, newData) => {
    setRows((currentRows) => currentRows
      .map((r) => (r.id === row.id ? { ...row, ...newData } : r)));
  };

  return (
    <FormControl error={!!errors?.goods}>
      <Table className={classes.table} ref={register}>
        <caption>
          <Button
            color="secondary"
            variant="contained"
            onClick={onRowAdd}
          >
            Добавить товар
          </Button>
        </caption>
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            {TABLE_COLUMNS.map((c) => <TableCell key={c.columnKey} align="left">{c.columnName}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <CustomTableRow
              key={row.id}
              row={row}
              onDelete={() => onDelete(row.id)}
              onRowChange={(newData) => onRowChange(row, newData)}
            />
          ))}
        </TableBody>
      </Table>
      <FormHelperText>{errors.goods?.message}</FormHelperText>
      {errors.goods?.constructor === Array
                && Array.from(new Set(errors.goods
                  .map((e) => Object.values(e))
                  .reduce((prev, next) => [...prev, ...next], [])
                  .map((i) => i.message)))
                  .map((message) => <FormHelperText>{message}</FormHelperText>)}
    </FormControl>
  );
};

export default Goods;
