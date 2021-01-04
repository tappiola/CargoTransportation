import React from 'react';
import TextField from '@material-ui/core/TextField';
import { validateEmail } from 'utils';

export const EmailField = ({ inputRef, defaultValue, error }) => (
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
    inputRef={inputRef({ required: true, validate: validateEmail })}
  />
);
