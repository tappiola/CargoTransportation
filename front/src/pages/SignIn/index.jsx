import React, { useState } from 'react';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';

import Logo from 'components/Logo';
import EmailField from 'components/FormFields/EmailField';
import PasswordField from 'components/FormFields/PasswordField';
import SubmitButton from 'components/Buttons/SubmitButton';

import { useInput, validateEmail, validatePassword } from 'utils';
import { loginUser } from 'redux/actions';
import { useStyles } from './SignIn.styles';

function SignIn(props) {
  const classes = useStyles();

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
      props.onSubmit({ email, password });
    }
  };

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Logo className={classes.avatar} />
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <EmailField error={emailError} variant="outlined" {...bindEmail} />
          <PasswordField error={passwordError} variant="outlined" {...bindPassword} />
          <SubmitButton className={classes.submit} />
        </form>
      </div>
    </Container>
  );
}

export default connect(
  null,
  (dispatch) => ({
    onSubmit({ email, password }) {
      dispatch(loginUser(email, password));
    },
  }),
)(SignIn);
