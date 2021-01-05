import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { validateDate } from 'utils';

export const BirthdayField = ({ register, defaultValue, error }) => (
  <FormControl error={!!error.birthdate} margin="normal">
    <InputLabel htmlFor="birthdate-input">Дата рождения *</InputLabel>
    <Input
      id="birthdate-input"
      name="birthdate"
      type="date"
      defaultValue={defaultValue.toISOString().substring(0, 10)}
      inputRef={register({
        valueAsDate: true,
        validate: (date) => validateDate(date),
        required: true,
      })}
    />
    <FormHelperText>{error.birthdate && 'Некорректная дата'}</FormHelperText>
  </FormControl>
);
