import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { useInput } from '../../../utils';

export const MiddleNameField = ({ onChange, defaultValue }) => {
  const { value: middleName, bind: bindMiddleName } = useInput(defaultValue);

  useEffect(() => {
    onChange(middleName);
  }, [middleName]);

  return (
    <Grid item xs={12} md={6}>
      <TextField
        label="Отчество"
        name="middle-name"
        autoComplete="additional-name"
        fullWidth
        {...bindMiddleName}
      />
    </Grid>
  );
};

MiddleNameField.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string.isRequired,
};
