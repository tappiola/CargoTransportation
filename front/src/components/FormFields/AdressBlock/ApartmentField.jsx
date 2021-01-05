import React from 'react';

import TextField from '@material-ui/core/TextField';

function ApartmentField({ defaultValue, register }) {
  return (
    <TextField
      margin="normal"
      name="adress.apartment"
      label="Квартира"
      defaultValue={defaultValue}
      autoComplete="address-level4"
      inputRef={register}
      fullWidth
    />
  );
}

export default ApartmentField;
