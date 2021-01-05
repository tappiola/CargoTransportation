import React from 'react';

import TextField from '@material-ui/core/TextField';
import { getHelperText } from 'utils';

function HouseField({ error, defaultValue, register }) {
  return (
    <TextField
      label="Дом"
      margin="normal"
      name="adress.house"
      error={error}
      defaultValue={defaultValue}
      fullWidth
      required
      inputRef={register}
      helperText={getHelperText(error)}
      autoComplete="address-level3"
    />
  );
}

export default HouseField;
