import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

export const RoleField = () => {
  const [role, setRole] = useState('admin');
  const roles = [
    { value: 'admin', label: 'Администратор' },
    { value: 'dispatcher', label: 'Диспетчер' },
    { value: 'company-owner', label: 'Владелец компании' },
    { value: 'Driver', label: 'Водитель' },
  ];

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <Grid item xs={12} sm={6}>
      <TextField
        select
        label="Роль"
        name="role"
        value={role}
        onChange={handleChange}
        fullWidth
        required
      >
        {roles.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  );
};
