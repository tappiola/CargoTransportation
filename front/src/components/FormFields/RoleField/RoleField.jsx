/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable arrow-body-style */
import React from 'react';

import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

const roles = [
  { value: 'admin', label: 'Администратор' },
  { value: 'dispatcher', label: 'Диспетчер' },
  { value: 'companyOwner', label: 'Владелец компании' },
  { value: 'driver', label: 'Водитель' },
];

export const RoleField = ({ inputRef, defaultValue, error }) => {
  return (
    <Grid item xs={12} sm={6}>
      <FormControl error={!!error}>
        <FormLabel component="legend">Роли:</FormLabel>
        <FormGroup row>
          {roles.map(({ value, label }) => (
            <FormControlLabel
              key={value}
              control={
                <Checkbox
                  inputRef={inputRef({ validate: () => error })}
                  checked={defaultValue[value]}
                  name={`roles.${value}`}
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
        <FormHelperText>Нужно выбрать хотя бы одну роль</FormHelperText>
      </FormControl>
    </Grid>
  );
};
