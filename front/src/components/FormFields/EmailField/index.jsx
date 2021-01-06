import React from 'react';
import TextField from '@material-ui/core/TextField';

const EmailField = ({
  register, defaultValue, error, ...props
}) => (
  <TextField
    fullWidth
    label="Email"
    name="email"
    margin="normal"
    error={!!error}
    autoComplete="email"
    defaultValue={defaultValue}
    helperText={error && 'Заполните это поле'}
    required
    inputRef={register}
    {...props}
  />
);

export default EmailField;
