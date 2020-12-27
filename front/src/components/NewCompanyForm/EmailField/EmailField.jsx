import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { useInput } from '../../../utils';

export const EmailField = ({ onChange, defaultValue }) => {
  const { value: email, bind: bindEmail } = useInput(defaultValue);

  useEffect(() => {
    onChange(email);
  }, [email]);

  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
        required
        {...bindEmail}
      />
    </Grid>
  );
};

EmailField.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string.isRequired,
};
