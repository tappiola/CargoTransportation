import React from 'react';
import { useFormContext } from 'react-hook-form';

import TableCell from '@material-ui/core/TableCell';

import BaseField from '../ControlledField';
import { useStyles } from './ControlledTable.styles';

const CustomTableCell = (
  {
    rowIndex,
    row,
    isEditMode,
    name,
    label,
    onChange,
    tableName,
  },
) => {
  const { register, errors } = useFormContext();
  const classes = useStyles();

  const tableRows = `${tableName}Rows`;
  const cellError = errors?.[tableRows]?.[rowIndex]?.[name];

  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <BaseField
          defaultValue={row[name]}
          name={`${tableRows}[${rowIndex}][${name}]`}
          placeholder={label}
          onInput={(e) => onChange(e, name)}
          className={classes.input}
          inputRef={register}
          customError={!!cellError}
          customHelperText={cellError?.message}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

export default CustomTableCell;
