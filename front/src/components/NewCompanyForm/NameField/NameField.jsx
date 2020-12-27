import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export const NameField = (props) => (
  <Grid item xs={12} md={6}>
    <TextField
      label="Имя"
      autoComplete="given-name"
      name="name"
      fullWidth
      required
      {...props}
    />
  </Grid>
);
