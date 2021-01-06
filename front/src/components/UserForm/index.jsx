import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  useForm,
  useFormContext,
  Controller,
  FormProvider,
} from 'react-hook-form';
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

const BaseField = ({ name, errors, ...props }) => {
  const { control } = useFormContext();
  return (
    <Controller
      as={TextField}
      name={name}
      control={control}
      margin="normal"
      error={errors && !!errors[name]}
      helperText={errors && errors[name]?.message}
      fullWidth
      defaultValue=""
      {...props}
    />
  );
};

function UserForm({ prevUserData, resolveSubmit }) {
  const birthDate = prevUserData?.birthDate || new Date();

  const classes = useStyles();
  const { id: _id } = useParams();
  const methods = useForm({
    defaultValues: prevUserData,
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, errors } = methods;
  return (
    <Container maxWidth="sm">
      <FormProvider {...methods}>
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
            <BaseField name="firstName" label="Имя" autoComplete="given-name" errors={errors} />
            <BaseField name="middleName" label="Отчество" autoComplete="additional-name" errors={errors} />
            <BaseField name="lastName" label="Фамилия" autoComplete="family-name" errors={errors} />
            <BaseField name="email" margin="normal" autoComplete="email" errors={errors} />
            <BaseField name="password" label="Пароль" type="password" autoComplete="current-password" errors={errors} />
            <Grid container spacing={1}>
              <Grid item xs={6} sm={4}>
                <BaseField name="city" label="Город" autoComplete="address-level2" errors={errors} />
              </Grid>
              <Grid item xs={6} sm={4}>
                <BaseField name="street" label="Улица" errors={errors} />
              </Grid>
              <Grid item xs={6} sm={2}>
                <BaseField name="house" label="Дом" autoComplete="address-level3" errors={errors} />
              </Grid>
              <Grid item xs={6} sm={2}>
                <BaseField name="apartment" label="Квартира" autoComplete="address-level4" errors={errors} />
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
                errors={errors}
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
      </FormProvider>
    </Container>
  );
}

export default connect(null, (dispatch) => ({
  resolveSubmit(data) {
    console.log(data);
    dispatch(dispatchSetUser(data));
  },
}))(UserForm);
