import React from 'react';
import TextField from '@material-ui/core/TextField';

import { getHelperText } from 'utils';

export const SurnameField = ({ inputRef, defaultValue, error }) => (
  <TextField
    label="Фамилия"
    autoComplete="family-name"
    name="surname"
    fullWidth
    margin="normal"
    required
    error={!!error}
    defaultValue={defaultValue}
    helperText={getHelperText(error)}
    inputRef={inputRef({ required: true, minLength: 3, maxLength: 15 })}
  />
);
