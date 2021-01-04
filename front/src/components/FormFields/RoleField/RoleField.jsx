import React from 'react';

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

const validateRoles = (rolesState) => rolesState
  && Object.values(rolesState).some((checked) => checked);

export const RoleField = ({
  inputRef, defaultValue, error, onChange,
}) => (
  <FormControl error={!!error}>
    <FormLabel component="legend">Роли:</FormLabel>
    <FormGroup row>
      {roles.map(({ value, label }) => (
        <FormControlLabel
          key={value}
          control={(
            <Checkbox
              inputRef={inputRef({
                validate: () => validateRoles(onChange),
              })}
              checked={defaultValue[value]}
              name={`roles.${value}`}
            />
          )}
          label={label}
        />
      ))}
    </FormGroup>
    <FormHelperText>{error && 'Выбирите хотя бы одну роль'}</FormHelperText>
  </FormControl>
);
