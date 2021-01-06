import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import SubmitButton from 'components/Buttons/SubmitButton';

import { dispatchSetUser } from 'redux/actions/users';

import RoleField from './RoleField';
import AddressBlock from './AddressField';
import { useStyles } from './Userform.styles';
import { schema } from './userSchema';

function UserForm({ prevUserData, resolveSubmit }) {
  const { birthDate, adress, roles } = prevUserData;

  const classes = useStyles();
  const { id: _id } = useParams();
  // eslint-disable-next-line object-curly-newline
  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: prevUserData,
    resolver: yupResolver(schema),
    reValidateMode: 'onSubmit',
  });
  const watchRoles = watch('roles');

  return (
    <Container maxWidth="sm">
      <form
        noValidate
        className={classes.form}
        onSubmit={handleSubmit(({ roles: rolesAsObject, ...data }) => {
          const rolesAsArray = Object.entries(roles)
            // eslint-disable-next-line no-unused-vars
            .filter(([role, isChecked]) => isChecked)
            .map(([role]) => role);
          resolveSubmit({ ...data, roles: rolesAsArray, id: _id });
        })}
      >
        <Grid container direction="column">
          <TextField
            name="firstName"
            label="Имя"
            margin="normal"
            autoComplete="given-name"
            inputRef={register}
            error={!!errors.firstName}
            helperText={errors?.firstName?.message}
            fullWidth
          />
          <TextField
            name="middleName"
            label="Отчество"
            margin="normal"
            autoComplete="additional-name"
            inputRef={register}
            error={errors.middleName}
            helperText={errors?.middleName?.message}
            fullWidth
          />
          <TextField
            name="lastName"
            label="Фамилия"
            margin="normal"
            inputRef={register}
            autoComplete="family-name"
            error={!!errors.lastName}
            helperText={errors?.lastName?.message}
            fullWidth
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            error={!!errors?.email}
            autoComplete="email"
            helperText={errors?.email?.message}
            required
            inputRef={register}
          />
          <TextField
            name="password"
            label="Пароль"
            type="password"
            margin="normal"
            autoComplete="current-password"
            inputRef={register}
            error={!!errors.password}
            helperText={errors?.password?.message}
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
            />
            <FormHelperText>{errors?.birthdate?.message}</FormHelperText>
          </FormControl>
          <RoleField
            register={register}
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
    console.log(data);
    dispatch(dispatchSetUser(data));
  },
}))(UserForm);
