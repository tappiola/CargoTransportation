import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Container from '@material-ui/core/Container';

import { useInput, validateEmail, validatePassword } from 'utils';
import { loginUser } from 'redux/actions';
import {
  EmailField, PasswordField, SubmitButton, Logo,
} from './Components';
import { useStyles } from './SignIn.styles';

function SignIn(props) {
  const classes = useStyles();
  const routerHistory = useHistory();

  const { value: email, bind: bindEmail } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isPasswordValid = validatePassword(password);
    const isEmailValid = validateEmail(email);

    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);

    if (props.onSubmit && isEmailValid && isPasswordValid) {
      props.onSubmit({ email, password, routerHistory });
    }
  };

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Logo className={classes.avatar} />
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <EmailField error={emailError} {...bindEmail} />
          <PasswordField error={passwordError} {...bindPassword} />
          <SubmitButton className={classes.submit} />
        </form>
      </div>
    </Container>
  );
}

export default connect(
  null,
  (dispatch) => ({
    onSubmit({ email, password, routerHistory }) {
      dispatch(loginUser(email, password, routerHistory));
    },
  }),
)(SignIn);
