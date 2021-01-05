import React from 'react';

import TextField from '@material-ui/core/TextField';

import { getHelperText } from 'utils';

function CityField({ error, defaultValue, register }) {
  return (
    <TextField
      label="Город"
      margin="normal"
      name="adress.city"
      error={error}
      defaultValue={defaultValue}
      fullWidth
      required
      inputRef={register}
      helperText={getHelperText(error)}
      autoComplete="address-level2"
    />
  );
}

export default CityField;
