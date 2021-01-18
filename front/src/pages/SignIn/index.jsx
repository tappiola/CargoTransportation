import React from 'react';
import { useDispatch } from 'react-redux';

import Container from '@material-ui/core/Container';
import { useForm, FormProvider } from 'react-hook-form';

import { loginResolver as resolver } from './loginResolver';
import { useStyles } from './SignIn.styles';
import SubmitButton from 'components/Buttons/SubmitButton';
import BaseField from 'components/ControlledField';
import Logo from 'components/Logo';
import { loginUser } from 'redux/actions';
import { usePending } from 'utils';

function SignIn() {
  const classes = useStyles();
  const methods = useForm({ resolver });
  const { handleSubmit } = methods;
  const dispatch = useDispatch();
  const sendFormData = ({ email, password }) => dispatch(loginUser(email, password));
  const { bindPending, handler } = usePending(sendFormData);

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Logo className={classes.avatar} />
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handler)}
            className={classes.form}
            noValidate
          >
            <BaseField name="email" label="email" />
            <BaseField name="password" label="Пароль" type="password" />
            <SubmitButton className={classes.submit} {...bindPending} />
          </form>
        </FormProvider>
      </div>
    </Container>
  );
}

export default SignIn;
