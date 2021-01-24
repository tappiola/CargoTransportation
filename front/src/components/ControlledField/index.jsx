import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@material-ui/core/TextField';

const ControlledField = ({ name, type, onChange, customError, customHelperText, ...props }) => {
  const { control, errors } = useFormContext();

  return (
    <Controller
      as={TextField}
      name={name}
      control={control}
      margin="normal"
      error={customError || errors && !!errors[name]}
      helperText={customHelperText || errors && errors[name]?.message}
      fullWidth
      defaultValue=""
      type={type}
      {...props}
    />
  );
};

export default ControlledField;
