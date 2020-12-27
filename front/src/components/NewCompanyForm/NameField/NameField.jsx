import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { useInput } from '../../../utils';

export const NameField = ({ onChange, defaultValue }) => {
  const { value: firstname, bind: bindName } = useInput(defaultValue);

  useEffect(() => {
    onChange((prev) => ({ ...prev, firstname }));
  }, [firstname]);

  return (
    <Grid item xs={12} md={6}>
      <TextField
        label="Имя"
        autoComplete="given-name"
        name="name"
        fullWidth
        required
        {...bindName}
      />
    </Grid>
  );
};

NameField.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string.isRequired,
};
