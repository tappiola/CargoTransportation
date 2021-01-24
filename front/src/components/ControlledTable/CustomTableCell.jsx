import React from 'react';
import { useFormContext } from 'react-hook-form';

import TableCell from '@material-ui/core/TableCell';

import BaseField from '../ControlledField';
import { useStyles } from './ControlledTable.styles';

const CustomTableCell = (
  {
    row,
    isEditMode,
    name,
    label,
    onChange,
  },
) => {
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

export default CustomTableCell;
