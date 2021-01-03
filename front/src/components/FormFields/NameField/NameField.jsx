/* eslint-disable no-nested-ternary */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const getHelperText = ({ type } = {}) => {
  if (!type) {
    return '';
  }
  switch (type) {
    case 'required':
      return 'Заполните это поле';
    case 'minLength':
    case 'maxLength':
    case 'min':
      return 'Некорректное значение';
    default:
      return 'Ошибка';
  }
};

export const NameField = ({ inputRef, defaultValue, error }) => (
  <Grid item xs={12} md={6}>
    <TextField
      label="Имя"
      autoComplete="given-name"
      name="firstname"
      fullWidth
      error={!!error}
      defaultValue={defaultValue}
      helperText={getHelperText(error)}
      inputRef={inputRef({ required: true, minLength: 3, maxLength: 15 })}
    />
  </Grid>
);
