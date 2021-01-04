import React from 'react';
import TextField from '@material-ui/core/TextField';

import { getHelperText } from 'utils';

export const MiddleNameField = ({ inputRef, defaultValue, error }) => (
  <TextField
    label="Отчество"
    name="middleName"
    autoComplete="additional-name"
    fullWidth
    margin="normal"
    error={!!error}
    defaultValue={defaultValue}
    helperText={getHelperText(error)}
    inputRef={inputRef({ minLength: 3, maxLength: 15 })}
  />
);
