import React from 'react';

import TextField from '@material-ui/core/TextField';

import { getHelperText } from 'utils';

function StreetField({ error, defaultValue, register }) {
  return (
    <TextField
      label="Улица"
      margin="normal"
      name="adress.street"
      error={error}
      defaultValue={defaultValue}
      fullWidth
      required
      inputRef={register}
      helperText={getHelperText(error)}
    />
  );
}

export default StreetField;
