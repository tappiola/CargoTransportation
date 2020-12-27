import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { useInput } from '../../../utils';
import { emailValidator } from '../validators';

export const EmailField = ({ onChange, defaultValue }) => {
  const { value: email, bind: bindEmail } = useInput(defaultValue);
  const [error, setError] = useState(false);

  const validateEmail = () => {
    setError(!emailValidator(email));
  };

  useEffect(() => {
    onChange((prev) => ({ ...prev, email }));
  }, [email]);

  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Email"
        name="email"
        autoComplete="email"
        onBlur={validateEmail}
        error={error}
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
