import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import { useInput } from '../../utils';

import {
  EmailField,
  PasswordField,
  SubmitButton,
  Logo,
} from './Components';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const onSubmit = (email, password) => {
  console.log(`Email: ${email} Password: ${password}`);
};

function SignIn() {
  const classes = useStyles();

  const { value: email, bind: bindEmail } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');

  const handleSubmit = () => onSubmit(email, password);

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Logo className={classes.avatar} />
        <form className={classes.form} noValidate>
          <EmailField {...bindEmail} />
          <PasswordField {...bindPassword} />
          <SubmitButton className={classes.submit} onClick={handleSubmit} />
        </form>
      </div>
    </Container>
  );
}
export default SignIn;
