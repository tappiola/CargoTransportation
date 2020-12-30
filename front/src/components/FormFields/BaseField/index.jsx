import React from 'react';

import TextField from '@material-ui/core/TextField';

const BaseField = ({
  label, name, autoComplete, ...otherProps
}) => (
  <TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    label={label}
    name={name}
    autoComplete={autoComplete}
    {...otherProps}
  />
);

export default BaseField;
