import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export const SurnameField = () => (
  <Grid item xs={12} md={12}>
    <TextField label="Surname" fullWidth required />
  </Grid>
);

export const NameField = () => (
  <Grid item xs={12} md={6}>
    <TextField label="Name" fullWidth required />
  </Grid>
);
export const MiddleNameField = () => (
  <Grid item xs={12} md={6}>
    <TextField label="Middle name" fullWidth required />
  </Grid>
);

export const SubmitButton = (props) => (
  <Grid item xs={12} maxWidth="sm">
    <Button
      type="submit"
      variant="contained"
      color="primary"
      {...props}
      fullWidth
    >
      Sign In
    </Button>
  </Grid>
);

export const BirthdayField = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Grid item>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date of birth"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
    </Grid>
  );
};

export const EmailField = (props) => (
  <Grid item xs={10}>
    <TextField
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      autoFocus
      {...props}
    />
  </Grid>
);

export const AdressBlock = () => (
  <Grid container item spacing={1}>
    <Grid item xs={6} sm={4}>
      <TextField label="City" fullWidth required />
    </Grid>
    <Grid item xs={6} sm={4}>
      <TextField label="Street" fullWidth required />
    </Grid>
    <Grid item xs={6} sm={2}>
      <TextField label="House" fullWidth required />
    </Grid>
    <Grid item xs={6} sm={2}>
      <TextField label="Apartment" fullWidth />
    </Grid>
  </Grid>
);

export const RoleField = () => {
  const [role, setRole] = React.useState('EUR');
  const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'dispatcher', label: 'Dispatcher' },
    { value: 'company-owner', label: 'Company owner' },
  ];

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <Grid item xs={6}>
      <TextField
        id="standard-select-currency"
        select
        label="Role"
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
