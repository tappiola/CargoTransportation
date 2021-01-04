import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import NameField from 'components/FormFields/NameField';
import SurnameField from 'components/FormFields/SurnameField';
import MiddleNameField from 'components/FormFields/MiddleNameField';
import BirthdayField from 'components/FormFields/BirthdayField';
import EmailField from 'components/FormFields/EmailField';
import AdressBlock from 'components/FormFields/AdressBlock';
import RoleField from 'components/FormFields/RoleField';
import PasswordField from 'components/FormFields/PasswordField';
import SubmitButton from 'components/Buttons/SubmitButton';

import { dispatchSetUser } from 'redux/actions/users';
import { useStyles } from './NewCompanyForm.styles';

function NewCompanyFrom({ prevUserData, resolveSubmit }) {
  const classes = useStyles();
  const {
    id: _id,
    firstname,
    middleName,
    surname,
    birthDate,
    email,
    password,
    adress,
    roles,
  } = prevUserData;
  // eslint-disable-next-line object-curly-newline
  const { register, handleSubmit, errors, watch } = useForm();
  const watchRoles = watch('roles');
  const handleSubmitMe = (data) => {
    resolveSubmit({ ...data, id: _id });
  };
  return (
    <Container maxWidth="sm">
      <form
        className={classes.form}
        onSubmit={handleSubmit(handleSubmitMe)}
        noValidate
      >
        <Grid container direction="column">
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
          <PasswordField
            variant="standard"
            inputRef={register}
            fullWidth
            error={errors.password}
            defaultValue={password}
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
            error={errors.roles}
            roles={watchRoles}
          />
          <SubmitButton className={classes.submit} />
        </Grid>
      </form>
    </Container>
  );
}

NewCompanyFrom.defaultProps = {
  prevUserData: {
    id: '0234123',
    firstname: '',
    surname: '',
    middleName: '',
    email: '',
    password: '',
    roles: {},
    birthDate: new Date(),
    adress: {
      city: '',
      street: '',
      house: '',
    },
  },
};

NewCompanyFrom.propTypes = {
  prevUserData: PropTypes.exact({
    id: PropTypes.string,
    firstname: PropTypes.string,
    surname: PropTypes.string,
    middleName: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    roles: PropTypes.object,
    birthDate: PropTypes.instanceOf(Date),
    adress: PropTypes.objectOf(PropTypes.string, PropTypes.number),
  }),
  resolveSubmit: PropTypes.func.isRequired,
};

export default connect(null, (dispatch) => ({
  resolveSubmit(data) {
    dispatch(dispatchSetUser(data));
  },
}))(NewCompanyFrom);
