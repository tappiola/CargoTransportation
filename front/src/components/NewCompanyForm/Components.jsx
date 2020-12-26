import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import DatePicker from 'react-date-picker';
import { Typography } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  label: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  wrapper: {
    border: 'hidden',
    '& > div': {
      padding: theme.spacing(0, 0, 0.5),
      border: 'none',
      borderBottomColor: theme.palette.text.secondary,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
    },
    '& svg': {
      display: 'none',
      stroke: theme.palette.text.secondary,
    },
    '& *:focus': {
      outlineWidth: 0,
    },
    '& input': {
      ...theme.typography.subtitle1,
      minWidth: 40,
      textAlign: 'center',
      letterSpacing: 'initial',
      color: theme.palette.text.secondary,
    },
  },
}));

// temp
const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
      },
    },
  };
};

export const SurnameField = (props) => (
  <Grid item xs={12} md={12}>
    <TextField
      label="Фамилия"
      autoComplete="family-name"
      name="surname"
      fullWidth
      required
      {...props}
    />
  </Grid>
);

export const NameField = (props) => (
  <Grid item xs={12} md={6}>
    <TextField
      label="Имя"
      autoComplete="given-name"
      name="name"
      fullWidth
      required
      {...props}
    />
  </Grid>
);

export const MiddleNameField = (props) => (
  <Grid item xs={12} md={6}>
    <TextField
      label="Отчество"
      name="middle-name"
      autoComplete="additional-name"
      fullWidth
      {...props}
    />
  </Grid>
);

export const SubmitButton = (props) => (
  <Grid item xs={12}>
    <Button
      type="submit"
      variant="contained"
      color="primary"
      {...props}
      fullWidth
    >
      Готово
    </Button>
  </Grid>
);

export const BirthdayField = ({ bindBirthDate }) => {
  const [birthDate, setBirthDate] = useState(new Date());
  const classes = useStyle();
  const handleDateChange = (date) => {
    setBirthDate(date);
    bindBirthDate(date);
  };

  return (
    <Grid item container alignItems="center" className={classes.root}>
      <Typography variant="subtitle1" className={classes.label}>
        Дата рождения:
      </Typography>
      <DatePicker
        className={classes.wrapper}
        timeClassName={classes.date}
        margin="normal"
        name="bday"
        id="date-picker-dialog"
        label="Дата рождения"
        format="dd/MM/yyyy"
        value={birthDate}
        autoComplete="bday"
        onChange={handleDateChange}
      />
    </Grid>
  );
};

export const EmailField = (props) => (
  <Grid item xs={12}>
    <TextField
      required
      fullWidth
      label="Email"
      name="email"
      autoComplete="email"
      autoFocus
      {...props}
    />
  </Grid>
);

export const AdressBlock = ({ bindAdress }) => {
  const { value: city, bind: bindCity } = useInput('');
  const { value: street, bind: bindStreet } = useInput('');
  const { value: house, bind: bindHouse } = useInput('');
  const { value: apartment, bind: bindApartment } = useInput('');

  useEffect(
    () => bindAdress({
      city,
      street,
      house,
      apartment,
    }),
    [city, street, house, apartment],
  );

  return (
    <Grid container item spacing={1}>
      <Grid item xs={6} sm={4}>
        <TextField
          label="Город"
          name="city"
          autoComplete="address-level2"
          fullWidth
          required
          {...bindCity}
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField
          label="Улица"
          name="street"
          fullWidth
          required
          {...bindStreet}
        />
      </Grid>
      <Grid item xs={6} sm={2}>
        <TextField
          label="Дом"
          name="house"
          autoComplete="address-level3"
          fullWidth
          required
          {...bindHouse}
        />
      </Grid>
      <Grid item xs={6} sm={2}>
        <TextField
          label="Квартира"
          autoComplete="address-level4"
          fullWidth
          {...bindApartment}
        />
      </Grid>
    </Grid>
  );
};

export const RoleField = () => {
  const [role, setRole] = useState('admin');
  const roles = [
    { value: 'admin', label: 'Администратор' },
    { value: 'dispatcher', label: 'Диспетчер' },
    { value: 'company-owner', label: 'Владелец компании' },
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
