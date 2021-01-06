import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

import { ROLE_NAMES, ROLES } from 'constants/permissions';

const validateRoles = (rolesState) => rolesState
  && Object.values(rolesState).some((checked) => checked);

const RoleField = ({
  register, error, roles,
}) => (
  <FormControl error={!!error}>
    <FormLabel component="legend">Роли:</FormLabel>
    <FormGroup row>
      {Object.entries(ROLE_NAMES)
        .filter(([roleName]) => roleName !== ROLES.GLOBAL_ADMIN)
        .map(([value, label]) => (
          <FormControlLabel
            key={value}
            control={(
              <Checkbox
                inputRef={register({
                  validate: () => validateRoles(roles),
                })}
                name={`roles.${value}`}
              />
            )}
            label={label}
          />
        ))}
    </FormGroup>
    <FormHelperText>{error && 'Выберите хотя бы одну роль'}</FormHelperText>
  </FormControl>
);

export default RoleField;
