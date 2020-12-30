import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export const MiddleNameField = ({ inputRef }) => (
  <Grid item xs={12} md={6}>
    <TextField
      label="Отчество"
      name="middle-name"
      autoComplete="additional-name"
      fullWidth
      inputRef={inputRef}
    />
  </Grid>
);
