import React from 'react';

import TextField from '@material-ui/core/TextField';

function ApartmentField({ defaultValue, ref }) {
  return (
    <TextField
      margin="normal"
      name="adress.apartment"
      label="Квартира"
      defaultValue={defaultValue}
      autoComplete="address-level4"
      inputRef={ref}
      fullWidth
    />
  );
}

export default ApartmentField;
