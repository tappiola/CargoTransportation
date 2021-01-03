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

export const AdressBlock = ({ inputRef, defaultValue, error }) => {
  const { city, street, house } = error?.adress || {};
  return (
    <Grid container item spacing={1}>
      <Grid item xs={6} sm={4}>
        <TextField
          label="Город"
          name="adress.city"
          error={!!city}
          defaultValue={defaultValue.city}
          fullWidth
          required
          inputRef={inputRef({ required: true, minLength: 5 })}
          helperText={getHelperText(city)}
          autoComplete="address-level2"
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField
          label="Улица"
          name="adress.street"
          error={!!street}
          defaultValue={defaultValue.street}
          inputRef={inputRef({ required: true, minLength: 5 })}
          helperText={getHelperText(street)}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={6} sm={2}>
        <TextField
          label="Дом"
          defaultValue={defaultValue.house}
          name="adress.house"
          autoComplete="address-level3"
          error={!!house}
          inputRef={inputRef({
            required: true,
            pattern: /^\d{1,3}[а-яa-z]{0,1}$/,
          })}
          helperText={getHelperText(house)}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={6} sm={2}>
        <TextField
          name="adress.apartment"
          label="Квартира"
          autoComplete="address-level4"
          inputRef={inputRef}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};
