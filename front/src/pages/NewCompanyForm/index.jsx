import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { NameField } from 'components/FormFields/NameField/NameField';
import { SurnameField } from 'components/FormFields/SurnameField/SurnameField';
import { MiddleNameField } from 'components/FormFields/MiddleNameField/MiddleNameField';
import { BirthdayField } from 'components/FormFields/BirthdayField/BirthdayField';
import { EmailField } from 'components/FormFields/EmailField/EmailField';
import { AdressBlock } from 'components/FormFields/AdressBlock/AdressBlock';
import { RoleField } from 'components/FormFields/RoleField/RoleField';
import SubmitButton from 'components/Buttons/SubmitButton';

import { useStyles } from './NewCompanyForm.styles';

function SignIn({ prevUserData, resolveSubmit }) {
  const classes = useStyles();
  const {
    firstname,
    middleName,
    surname,
    birthDate,
    email,
    adress,
    roles,
  } = prevUserData;
  const {
    register,
    handleSubmit,
    errors,
    getValues,
  } = useForm();

  const handleSubmitMe = (data) => {
    const isRoleChecked = Object.values(data.roles).some((checked) => checked);
    if (isRoleChecked) {
      resolveSubmit(data);
    }
  };
  return (
    <Container maxWidth="sm">
      <div className={classes.paper}>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleSubmitMe)}
          noValidate
        >
          <Grid container justify="space-between" spacing={3}>
            <NameField
              inputRef={register}
              defaultValue={firstname}
              error={errors.firstname}
            />
            <MiddleNameField
              inputRef={register}
              defaultValue={middleName}
              error={errors.middleName}
            />
            <SurnameField
              inputRef={register}
              defaultValue={surname}
              error={errors.surname}
            />
            <EmailField
              error={errors.email}
              inputRef={register}
              defaultValue={email}
            />
            <AdressBlock
              inputRef={register}
              defaultValue={adress}
              error={errors}
            />
            <BirthdayField
              inputRef={register}
              defaultValue={birthDate}
              error={errors}
            />
            <RoleField
              inputRef={register}
              defaultValue={roles}
              error={
                getValues().roles
                && Object.values(getValues().roles).every((checked) => !checked)
              }
            />
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
    roles: {},
    birthDate: new Date(),
    adress: {
      city: '',
      street: '',
      house: '',
    },
  },
};

SignIn.propTypes = {
  prevUserData: PropTypes.exact({
    firstname: PropTypes.string,
    surname: PropTypes.string,
    middleName: PropTypes.string,
    email: PropTypes.string,
    roles: PropTypes.object,
    birthDate: PropTypes.instanceOf(Date),
    adress: PropTypes.objectOf(PropTypes.string, PropTypes.number),
  }),
  resolveSubmit: PropTypes.func.isRequired,
};

export default connect(null, (/* dispatch */) => ({
  resolveSubmit() {
    console.log('RESOLVE');
    // dispatch();
  },
}))(SignIn);
