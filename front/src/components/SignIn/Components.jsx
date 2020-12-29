import React from 'react';

import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

const BaseField = ({
  label, name, autoComplete, ...otherProps
}) => (
  <TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    label={label}
    name={name}
    autoComplete={autoComplete}
    {...otherProps}
  />
);

export const EmailField = (props) => (
  <BaseField
    label="Email"
    name="email"
    autoComplete="email"
    autoFocus
    {...props}
  />
);

export const PasswordField = (props) => (
  <BaseField
    name="password"
    label="Пароль"
    type="password"
    autoComplete="current-password"
    {...props}
  />
);

export const SubmitButton = (props) => (
  <Button
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
    {...props}
  >
    Вход
  </Button>
);

export const Logo = ({ className }) => (
  <>
    <Avatar className={className}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h2" variant="h5">
      Войти в Систему
    </Typography>
  </>
);
