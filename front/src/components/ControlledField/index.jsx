import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';

const formatedDate = new Date().toISOString().slice(0, 10);

const ControlledField = ({ name, type, ...props }) => {
  const { control, errors } = useFormContext();
  return (
    <Controller
      as={TextField}
      name={name}
      control={control}
      margin="normal"
      error={errors && !!errors[name]}
      helperText={errors && errors[name]?.message}
      fullWidth
      defaultValue={type === 'date' ? formatedDate : ''}
      type={type}
      {...props}
    />
  );
};

export default ControlledField;
