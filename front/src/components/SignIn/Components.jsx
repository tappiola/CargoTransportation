import React from 'react';

import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

export const EmailField = (props) => (
  <TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    id="email"
    label="Email Address"
    name="email"
    autoComplete="email"
    autoFocus
    {...props}
  />
);

export const PasswordField = (props) => (
  <TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    name="password"
    label="Password"
    type="password"
    id="password"
    autoComplete="current-password"
    {...props}
  />
);

export const SubmitButton = (props) => (
  <Button
    type="button"
    fullWidth
    variant="contained"
    color="primary"
    {...props}
  >
    Sign In
  </Button>
);

export const Logo = ({ className }) => (
  <>
    <Avatar className={className}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h2" variant="h5">
      Sign in
    </Typography>
  </>
);
