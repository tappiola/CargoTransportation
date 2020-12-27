import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export const SurnameField = (props) => (
  <Grid item xs={12} md={12}>
    <TextField
      label="Фамилия"
      autoComplete="family-name"
      name="surname"
      fullWidth
      required
      {...props}
    />
  </Grid>
);
