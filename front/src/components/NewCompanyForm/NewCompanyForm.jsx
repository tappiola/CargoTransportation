import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { NameField } from './NameField/NameField';
import { SurnameField } from './SurnameField/SurnameField';
import { MiddleNameField } from './MiddleNameField/MiddleNameField';
import { BirthdayField } from './BirthdayField/BirthdayField';
import { SubmitButton } from './SubmitButton/SubmitButton';
import { EmailField } from './EmailField/EmailField';
import { AdressBlock } from './AdressBlock/AdressBlock';
import { RoleField } from './RoleField/RoleField';

import { userDataValidator } from './validators';

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
function SignIn({ prevUserData, onSubmit }) {
  const classes = useStyles();
  const [adress, setAdress] = useState(prevUserData.adress);
  const [birthDate, setBirthDate] = useState(prevUserData.birthDate);
  const [firstname, setFirstname] = useState(prevUserData.firstname);
  const [surname, setSurname] = useState(prevUserData.firstname);
  const [middleName, setMiddleName] = useState(prevUserData.middleName);
  const [email, setEmail] = useState(prevUserData.email);

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
            <NameField onChange={setFirstname} defaultValue={prevUserData.firstname} />
            <MiddleNameField onChange={setMiddleName} defaultValue={prevUserData.middleName} />
            <SurnameField onChange={setSurname} defaultValue={prevUserData.surname} />
            <BirthdayField bindBirthDate={setBirthDate} />
            <EmailField onChange={setEmail} defaultValue={prevUserData.email} />
            <AdressBlock bindAdress={setAdress} defaultValue={prevUserData.adress} />
            <RoleField />
            <SubmitButton className={classes.submit} />
          </Grid>
        </form>
      </div>
    </Container>
  );
}

SignIn.defaultProps = {
  prevUserData: {
    firstname: '',
    surname: '',
    middleName: '',
    email: '',
    birthDate: new Date(),
    adress: {},
  },
};

SignIn.propTypes = {
  prevUserData: PropTypes.exact({
    firstname: PropTypes.string,
    surname: PropTypes.string,
    middleName: PropTypes.string,
    email: PropTypes.string,
    birthDate: PropTypes.instanceOf(Date),
    adress: PropTypes.objectOf(
      PropTypes.string,
      PropTypes.number,
    ),
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default connect(null, (/* dispatch */) => ({
  onSubmit(data) {
    console.log(data);
    // dispatch();
  },
}))(SignIn);
