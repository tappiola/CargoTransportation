import React from 'react';
import { validatePassword, getHelperText } from 'utils';
import TextField from '@material-ui/core/TextField';

export const PasswordField = ({
  register, defaultValue, error, ...props
}) => (
  <TextField
    name="password"
    label="Пароль"
    type="password"
    fullWidth
    error={!!error}
    autoComplete="current-password"
    helperText={getHelperText(error)}
    inputRef={register && register({
      required: true,
      minLength: 8,
      maxLength: 15,
      validate: validatePassword,
    })}
    {...props}
  />
);
