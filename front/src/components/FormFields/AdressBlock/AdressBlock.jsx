import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export const AdressBlock = ({ inputRef }) => (
  <Grid container item spacing={1}>
    <Grid item xs={6} sm={4}>
      <TextField
        label="Город"
        name="city"
        fullWidth
        required
        inputRef={inputRef}
        autoComplete="address-level2"
      />
    </Grid>
    <Grid item xs={6} sm={4}>
      <TextField
        label="Улица"
        name="street"
        inputRef={inputRef}
        fullWidth
        required
      />
    </Grid>
    <Grid item xs={6} sm={2}>
      <TextField
        label="Дом"
        name="house"
        autoComplete="address-level3"
        inputRef={inputRef}
        fullWidth
        required
      />
    </Grid>
    <Grid item xs={6} sm={2}>
      <TextField
        label="Квартира"
        autoComplete="address-level4"
        inputRef={inputRef}
        fullWidth
      />
    </Grid>
  </Grid>
);
