import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export const EmailField = (props) => (
  <Grid item xs={12}>
    <TextField
      fullWidth
      label="Email"
      name="email"
      autoComplete="email"
      autoFocus
      required
      {...props}
    />
  </Grid>
);
