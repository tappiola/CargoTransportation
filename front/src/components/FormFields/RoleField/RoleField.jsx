import React from 'react';

import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/NativeSelect';

const roles = [
  { value: 'admin', label: 'Администратор' },
  { value: 'dispatcher', label: 'Диспетчер' },
  { value: 'company-owner', label: 'Владелец компании' },
  { value: 'Driver', label: 'Водитель' },
];

export const RoleField = ({ inputRef }) => (
  <Grid item xs={12} sm={6}>
    <Select
      label="Роль"
      name="role"
      fullWidth
      required
      inputRef={inputRef}
    >
      {roles.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Select>
  </Grid>
);
