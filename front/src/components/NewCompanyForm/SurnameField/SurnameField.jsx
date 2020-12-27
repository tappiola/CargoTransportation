import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { useInput } from '../../../utils';

export const SurnameField = ({ onChange, defaultValue }) => {
  const { value: surname, bind: bindSurname } = useInput(defaultValue);

  useEffect(() => {
    onChange((prev) => ({ ...prev, surname }));
  }, [surname]);

  return (
    <Grid item xs={12} md={12}>
      <TextField
        label="Фамилия"
        autoComplete="family-name"
        name="surname"
        fullWidth
        required
        {...bindSurname}
      />
    </Grid>
  );
};

SurnameField.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string.isRequired,
};
