import React from 'react';

import TextField from '@material-ui/core/TextField';
import { getHelperText } from 'utils';

function HouseField({ error, defaultValue, ref }) {
  return (
    <TextField
      label="Дом"
      margin="normal"
      name="adress.house"
      error={error}
      defaultValue={defaultValue}
      fullWidth
      required
      inputRef={ref}
      helperText={getHelperText(error)}
      autoComplete="address-level3"
    />
  );
}

export default HouseField;
