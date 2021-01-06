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
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';

import SubmitButton from 'components/Buttons/SubmitButton';
import { ROLE_NAMES, ROLES } from 'constants/permissions';
import { dispatchSetUser } from 'redux/actions/users';
import { useStyles } from './UserForm.styles';
import { schema } from './userSchema';

function UserForm({ prevUserData, resolveSubmit }) {
  const birthDate = prevUserData?.birthDate || new Date();

  const classes = useStyles();
  const { id: _id } = useParams();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: prevUserData,
    resolver: yupResolver(schema),
  });

  const BaseField = ({ name, ...props }) => (
    <TextField
      name={name}
      margin="normal"
      inputRef={register}
      error={!!errors[name]}
      helperText={errors[name]?.message}
      fullWidth
      {...props}
    />
  );

  return (
    <Container maxWidth="sm">
      <form
        noValidate
        className={classes.form}
        onSubmit={handleSubmit(({ roles: rolesAsObject, ...data }) => {
          const rolesAsArray = Object.entries(rolesAsObject)
            // eslint-disable-next-line no-unused-vars
            .filter(([role, isChecked]) => isChecked)
            .map(([role]) => role);
          resolveSubmit({ ...data, roles: rolesAsArray, id: _id });
        })}
      >
        <Grid container direction="column">
          <BaseField name="firstName" label="Имя" autoComplete="given-name" />
          <BaseField name="middleName" label="Отчество" autoComplete="additional-name" />
          <BaseField name="lastName" label="Фамилия" autoComplete="family-name" />
          <BaseField name="email" margin="normal" autoComplete="email" />
          <BaseField name="password" label="Пароль" type="password" autoComplete="current-password" />
          <Grid container spacing={1}>
            <Grid item xs={6} sm={4}>
              <BaseField name="city" label="Город" autoComplete="address-level2" />
            </Grid>
            <Grid item xs={6} sm={4}>
              <BaseField name="street" label="Улица" />
            </Grid>
            <Grid item xs={6} sm={2}>
              <BaseField name="house" label="Дом" autoComplete="address-level3" />
            </Grid>
            <Grid item xs={6} sm={2}>
              <BaseField name="apartment" label="Квартира" autoComplete="address-level4" />
            </Grid>
          </Grid>
          <FormControl error={!!errors.birthdate} margin="normal">
            <InputLabel htmlFor="birthdate-input">Дата рождения *</InputLabel>
            <Input
              id="birthdate-input"
              name="birthdate"
              type="date"
              inputRef={register}
              defaultValue={birthDate.toISOString().substring(0, 10)}
            />
            <FormHelperText>{errors?.birthdate?.message}</FormHelperText>
          </FormControl>
          <FormControl error={!!errors?.roles}>
            <FormLabel component="legend">Роли:</FormLabel>
            <FormGroup row>
              {Object.entries(ROLE_NAMES)
                .filter(([roleName]) => roleName !== ROLES.GLOBAL_ADMIN)
                .map(([value, label]) => (
                  <FormControlLabel
                    key={value}
                    control={
                      <Checkbox inputRef={register} name={`roles.${value}`} />
                    }
                    label={label}
                  />
                ))}
            </FormGroup>
            <FormHelperText>
              {errors.roles && 'Выберите хотя бы одну роль'}
            </FormHelperText>
          </FormControl>
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
