import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

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
function SignIn({ prevUserData, resolveSubmit }) {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log(errors);
    if (userDataValidator(data)) {
      resolveSubmit(data);
    }
  };

  return (
    <Container maxWidth="sm">
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container justify="space-between" spacing={3}>
            <NameField
              inputRef={register}
              defaultValue={prevUserData.firstname}
            />
            <MiddleNameField
              inputRef={register}
              defaultValue={prevUserData.middleName}
            />
            <SurnameField
              inputRef={register}
              defaultValue={prevUserData.surname}
            />
            <BirthdayField
              inputRef={register}
              defaultValue={prevUserData.birthDate}
            />
            <EmailField
              inputRef={register}
              defaultValue={prevUserData.email}
            />
            <AdressBlock
              inputRef={register}
              defaultValue={prevUserData.adress}
            />
            <RoleField inputRef={register} />
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
    adress: PropTypes.objectOf(PropTypes.string, PropTypes.number),
  }),
  resolveSubmit: PropTypes.func.isRequired,
};

export default connect(null, (/* dispatch */) => ({
  resolveSubmit() {
    // dispatch();
  },
}))(SignIn);
