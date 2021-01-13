import { useDispatch } from 'react-redux';
import React from 'react';

import Container from '@material-ui/core/Container';

import { loginUser } from 'redux/actions';
import BaseField from 'components/ControlledField';
import Logo from 'components/Logo';
import SubmitButton from 'components/Buttons/SubmitButton';

import { FormProvider, useForm } from 'react-hook-form';

import { loginResolver as resolver } from './loginResolver';
import { useStyles } from './SignIn.styles';

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
