import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

import { ROLE_NAMES } from 'constants/permissions';

const validateRoles = (rolesState) => rolesState
  && Object.values(rolesState).some((checked) => checked);

export const RoleField = ({
  inputRef, defaultValue, error, roles,
}) => (
  <FormControl error={!!error}>
    <FormLabel component="legend">Роли:</FormLabel>
    <FormGroup row>
      {Object.entries(ROLE_NAMES).map(([value, label]) => (
        <FormControlLabel
          key={value}
          control={(
            <Checkbox
              inputRef={inputRef({
                validate: () => validateRoles(roles),
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
