import React from 'react';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { validateDate } from 'utils';

export const BirthdayField = ({ inputRef, defaultValue, error }) => (
  <Grid item xs={12}>
    <FormControl error={!!error.birthdate}>
      <InputLabel htmlFor="birthdate-input">Дата рождения *</InputLabel>
      <Input
        id="birthdate-input"
        name="birthdate"
        type="date"
        defaultValue={defaultValue.toISOString().substring(0, 10)}
        inputRef={inputRef({
          valueAsDate: true,
          validate: (date) => validateDate(date),
          required: true,
        })}
      />
      <FormHelperText>{error.birthdate && 'Некорректная дата'}</FormHelperText>
    </FormControl>
  </Grid>
);
