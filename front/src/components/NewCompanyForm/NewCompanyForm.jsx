import React, { useState } from 'react';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import {
  NameField,
  SurnameField,
  MiddleNameField,
  BirthdayField,
  SubmitButton,
  EmailField,
  AdressBlock,
  RoleField,
} from './Components';

// will be imported from /utils
import { userDataValidator } from './validators';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//
function SignIn({ prevUserData = {}, onSubmit }) {
  const classes = useStyles();
  const [adress, setAdress] = useState(prevUserData.adress || null);
  const [birthDate, setBirthDate] = useState(prevUserData.birthDate || null);
  const { value: firstname, bind: bindName } = useInput(prevUserData.firstname || '');
  const { value: surname, bind: bindSurname } = useInput(prevUserData.surname || '');
  const { value: middleName, bind: bindMiddleName } = useInput(prevUserData.middleName || '');
  const { value: email, bind: bindEmail } = useInput(prevUserData.email || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      firstname,
      surname,
      middleName,
      email,
      adress,
      birthDate,
    };

    if (userDataValidator(userData)) {
      onSubmit(userData);
    }
  };

  return (
    <Container maxWidth="sm">
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container justify="space-between" spacing={3}>
            <NameField {...bindName} />
            <MiddleNameField {...bindMiddleName} />
            <SurnameField {...bindSurname} />
            <BirthdayField bindBirthDate={setBirthDate} />
            <EmailField {...bindEmail} />
            <AdressBlock bindAdress={setAdress} />
            <RoleField />
            <SubmitButton className={classes.submit} />
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default connect(null, (/* dispatch */) => ({
  onSubmit() {
    // dispatch();
  },
}))(SignIn);
