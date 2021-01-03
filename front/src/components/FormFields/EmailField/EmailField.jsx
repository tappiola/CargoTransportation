import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { validateEmail } from 'utils';

export const EmailField = ({ inputRef, defaultValue, error }) => (
  <Grid item xs={12}>
    <TextField
      fullWidth
      label="Email"
      name="email"
      error={!!error}
      autoComplete="email"
      defaultValue={defaultValue}
      helperText={error && 'Заполните это поле'}
      required
      inputRef={inputRef({ required: true, validate: validateEmail })}
    />
  </Grid>
);
