import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { NameField } from 'components/FormFields/NameField/NameField';
import { SurnameField } from 'components/FormFields/SurnameField/SurnameField';
import { MiddleNameField } from 'components/FormFields/MiddleNameField/MiddleNameField';
import { BirthdayField } from 'components/FormFields/BirthdayField/BirthdayField';
import { EmailField } from 'components/FormFields/EmailField/EmailField';
import { AdressBlock } from 'components/FormFields/AdressBlock/AdressBlock';
import { RoleField } from 'components/FormFields/RoleField/RoleField';
import SubmitButton from 'components/Buttons/SubmitButton';

import { userDataValidator } from 'utils';

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
  const [userData, setUserData] = useState(prevUserData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userDataValidator(userData)) {
      onSubmit(userData);
    }
  };

  return (
    <Container maxWidth="sm">
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container justify="space-between" spacing={3}>
            <NameField onChange={setUserData} defaultValue={prevUserData.firstname} />
            <MiddleNameField onChange={setUserData} defaultValue={prevUserData.middleName} />
            <SurnameField onChange={setUserData} defaultValue={prevUserData.surname} />
            <BirthdayField onChange={setUserData} defaultValue={prevUserData.birthDate} />
            <EmailField onChange={setUserData} defaultValue={prevUserData.email} />
            <AdressBlock onChange={setUserData} defaultValue={prevUserData.adress} />
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
  onSubmit() {
    // dispatch();
  },
}))(SignIn);
