import React from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import React, { useState } from 'react';

import Container from '@material-ui/core/Container';

import Logo from 'components/Logo';
import BaseField from 'components/ControlledField';
import EmailField from 'components/FormFields/EmailField';
import Logo from 'components/Logo';
import PasswordField from 'components/FormFields/PasswordField';
import SubmitButton from 'components/Buttons/SubmitButton';
import { loginUser } from 'redux/actions';

import { useForm, FormProvider } from 'react-hook-form';

import { loginUser } from 'redux/actions';
import { useInput, validateEmail, validatePassword } from 'utils';
import { useStyles } from './SignIn.styles';
import { loginResolver as resolver } from './loginResolver';

function SignIn() {
  const classes = useStyles();
  const methods = useForm({ resolver });
  const { handleSubmit } = methods;
  const dispatch = useDispatch();
  const sendFormData = ({ email, password }) => dispatch(loginUser(email, password));

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Logo className={classes.avatar} />
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(sendFormData)}
            className={classes.form}
            noValidate
          >
            <BaseField name="email" label="email" />
            <BaseField name="password" label="Пароль" type="password" />
            <SubmitButton className={classes.submit} />
          </form>
        </FormProvider>
      </div>
    </Container>
  );
}

export default SignIn;
