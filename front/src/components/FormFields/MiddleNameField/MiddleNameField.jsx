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

export const MiddleNameField = ({ inputRef, defaultValue, error }) => (
  <Grid item xs={12} md={6}>
    <TextField
      label="Отчество"
      name="middleName"
      autoComplete="additional-name"
      fullWidth
      error={!!error}
      defaultValue={defaultValue}
      helperText={getHelperText(error)}
      inputRef={inputRef({ minLength: 3, maxLength: 15 })}
    />
  </Grid>
);
