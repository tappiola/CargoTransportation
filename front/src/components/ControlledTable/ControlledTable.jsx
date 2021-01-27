import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useStyles } from './ControlledTable.styles';
import CustomTableRow from './CustomTableRow';

const createData = (columnKeys, values) => ({
  id: Number(new Date()),
  ...Object.fromEntries(columnKeys.map((k, index) => ([k, values[index]]))),
});

const ControlledTable = (
  {
    tableName,
    tableColumns,
    columnKeys,
    confirmDeleteTitle,
    confirmDeleteDescription,
  },
) => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const {
    setValue, register, errors, clearErrors,
  } = useFormContext();

  useEffect(() => {
    register({ name: tableName });
  }, [register]);

  useEffect(() => {
    setValue(tableName, rows);
  }, [rows]);

  const onDelete = (rowId) => {
    setRows((currentRows) => [...currentRows.filter((r) => r.id !== rowId)]);
  };

  const onRowAdd = () => {
    clearErrors();
    setRows((currentRows) => [...currentRows, createData(columnKeys, Array(columnKeys.length).fill(''))]);
  };

  const onRowChange = (row, newData) => {
    setRows((currentRows) => currentRows
      .map((r) => (r.id === row.id ? { ...row, ...newData } : r)));
  };

  return (
    <FormControl fullWidth error={!!errors[tableName]}>
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
            {tableColumns.map((c) => <TableCell key={c.columnKey} align="left">{c.columnName}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <CustomTableRow
              key={row.id}
              rowIndex={i}
              row={row}
              onDelete={() => onDelete(row.id)}
              onRowChange={(newData) => onRowChange(row, newData)}
              columnKeys={columnKeys}
              tableName={tableName}
              tableColumns={tableColumns}
              confirmDeleteTitle={confirmDeleteTitle}
              confirmDeleteDescription={confirmDeleteDescription}
            />
          ))}
        </TableBody>
      </Table>
      <FormHelperText>{errors?.[tableName]?.message}</FormHelperText>
    </FormControl>
  );
};

export default ControlledTable;
