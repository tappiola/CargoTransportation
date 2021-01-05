import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import EmailField from 'components/FormFields/EmailField';
import AddressBlock from 'components/FormFields/AddressBlock';
import RoleField from 'components/FormFields/RoleField';
import SubmitButton from 'components/Buttons/SubmitButton';

import { getHelperText, validateDate, validatePassword } from 'utils';
import { dispatchSetUser } from 'redux/actions/users';
import { useStyles } from './Userform.styels';

function UserForm({ prevUserData, resolveSubmit }) {
  const classes = useStyles();
  const { id: _id } = useParams();
  const {
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
          <TextField
            name="firstname"
            label="Имя"
            margin="normal"
            autoComplete="given-name"
            error={!!errors.firstname}
            defaultValue={firstname}
            helperText={getHelperText(errors.firstname)}
            inputRef={register({ required: true, minLength: 3, maxLength: 15 })}
            fullWidth
          />
          <TextField
            name="middleName"
            label="Отчество"
            margin="normal"
            autoComplete="additional-name"
            error={errors.middleName}
            defaultValue={middleName}
            helperText={getHelperText(errors.middleName)}
            inputRef={register({ minLength: 3, maxLength: 15 })}
            fullWidth
          />
          <TextField
            name="surname"
            label="Фамилия"
            margin="normal"
            autoComplete="family-name"
            error={!!errors.surname}
            defaultValue={surname}
            helperText={getHelperText(errors.surname)}
            inputRef={register({ required: true, minLength: 3, maxLength: 15 })}
            fullWidth
          />
          <EmailField
            error={errors.email}
            register={register}
            defaultValue={email}
          />
          <TextField
            name="password"
            label="Пароль"
            type="password"
            margin="normal"
            autoComplete="current-password"
            error={!!errors.password}
            defaultValue={password}
            helperText={getHelperText(errors.password)}
            inputRef={
              register({
                required: true,
                minLength: 8,
                maxLength: 15,
                validate: validatePassword,
              })
            }
          />
          <AddressBlock
            inputRef={register}
            defaultValue={adress}
            error={errors}
          />
          <FormControl error={!!errors.birthdate} margin="normal">
            <InputLabel htmlFor="birthdate-input">Дата рождения *</InputLabel>
            <Input
              id="birthdate-input"
              name="birthdate"
              type="date"
              defaultValue={birthDate.toISOString().substring(0, 10)}
              inputRef={register({
                valueAsDate: true,
                validate: (date) => validateDate(date),
                required: true,
              })}
            />
            <FormHelperText>
              {errors.birthdate && 'Некорректная дата'}
            </FormHelperText>
          </FormControl>
          <RoleField
            register={register}
            defaultValue={roles}
            error={errors.roles}
            roles={watchRoles}
          />
          <SubmitButton className={classes.submit}>Готово</SubmitButton>
        </Grid>
      </form>
    </Container>
  );
}

export default connect(null, (dispatch) => ({
  resolveSubmit(data) {
    dispatch(dispatchSetUser(data));
  },
}))(UserForm);
