/* eslint-disable no-nested-ternary */
import React from 'react';
import TextField from '@material-ui/core/TextField';

import { getHelperText } from 'utils';

export const NameField = ({ inputRef, defaultValue, error }) => (
  <TextField
    label="Имя"
    autoComplete="given-name"
    name="firstname"
    margin="normal"
    fullWidth
    error={!!error}
    defaultValue={defaultValue}
    required
    helperText={getHelperText(error)}
    inputRef={inputRef({ required: true, minLength: 3, maxLength: 15 })}
  />
);
