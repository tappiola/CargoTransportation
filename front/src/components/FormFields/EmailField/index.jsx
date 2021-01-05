import React from 'react';
import TextField from '@material-ui/core/TextField';
import { validateEmail } from 'utils';

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
    inputRef={register && register({ required: true, validate: validateEmail })}
    {...props}
  />
);

export default EmailField;
