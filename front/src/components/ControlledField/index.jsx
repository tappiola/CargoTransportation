import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@material-ui/core/TextField';

const ControlledField = ({ name, onChange, customError, customHelperText, ...props }) => {
  const { control, errors } = useFormContext();

  return (
    <Controller
      name={name}
      as={TextField}
      control={control}
      helperText={customHelperText || (errors && errors[name]?.message)}
      error={customError || (errors && !!errors[name])}
      margin="normal"
      defaultValue=""
      fullWidth
      {...props}
    />
  );
};

export const DateField = ({ ...props }) => (
  <ControlledField {...props} type="date" InputLabelProps={{ shrink: true }} />
);

export const DateTimeField = ({ ...props }) => (
  <ControlledField {...props} type="datetime-local" InputLabelProps={{ shrink: true }} />
);

export default ControlledField;
