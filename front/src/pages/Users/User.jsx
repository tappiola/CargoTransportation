import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { dispatchSetUser } from 'redux/actions/users';

import { useForm, FormProvider } from 'react-hook-form';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';

import SubmitButton from 'components/Buttons/SubmitButton';
import BaseField from 'components/ControlledField';
import { ROLE_NAMES, ROLES } from 'constants/permissions';
import { userResolver as resolver } from 'utils';

const ALLOWED_ROLES = Object.entries(ROLE_NAMES).filter(
  ([name]) => name !== ROLES.GLOBAL_ADMIN,
);

// temporary solution
const preNormalize = (data, id) => {
  if (!id) return undefined;
  const currentUser = data.find(({ id: _id }) => _id.toString() === id);
  const [firstName, lastName, middleName] = currentUser.name.split(' ');
  return {
    ...currentUser,
    firstName,
    lastName,
    middleName,
    birthDate: currentUser.birthDate.toISOString().slice(0, 10),
  };
};

function User({ data, sendFormData }) {
  const { id } = useParams();
  const defaultValues = preNormalize(data, id);
  const methods = useForm({ defaultValues, resolver });
  const { register, handleSubmit, errors } = methods;

  return (
    <Container maxWidth="sm">
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(sendFormData)}>
          <Grid container direction="column">
            <BaseField name="firstName" label="Имя" />
            <BaseField name="middleName" label="Отчество" />
            <BaseField name="lastName" label="Фамилия" />
            <BaseField name="email" label="email" />
            <BaseField name="password" label="Пароль" type="password" />

            <Grid container spacing={1}>
              <Grid item xs={6} sm={4}>
                <BaseField name="city" label="Город" />
              </Grid>
              <Grid item xs={6} sm={4}>
                <BaseField name="street" label="Улица" />
              </Grid>
              <Grid item xs={6} sm={2}>
                <BaseField name="house" label="Дом" />
              </Grid>
              <Grid item xs={6} sm={2}>
                <BaseField name="apartment" label="Квартира" />
              </Grid>
            </Grid>

            <BaseField name="birthDate" type="date" label="Дата рождения" />

            <FormControl error={!!errors?.roles} margin="normal">
              <FormLabel>Роли:</FormLabel>
              <FormGroup row>
                {ALLOWED_ROLES.map(([name, label]) => (
                  <FormControlLabel
                    key={name}
                    control={(
                      <Checkbox
                        inputRef={register}
                        name={`roles.${name}`}
                        defaultChecked={defaultValues?.roles[name]}
                      />
                    )}
                    label={label}
                  />
                ))}
              </FormGroup>
              <FormHelperText>
                {errors.roles && 'Выберите хотя бы одну роль'}
              </FormHelperText>
            </FormControl>

            <SubmitButton>Готово</SubmitButton>
          </Grid>
        </form>
      </FormProvider>
    </Container>
  );
}

const normalize = ({ roles: asObj, ...data }, id) => ({
  ...data,
  id,
  roles: Object.entries(asObj)
    .filter(([, checked]) => checked)
    .map(([role]) => role),
});

export default connect(
  ({ users }) => ({ data: users.usersData }),
  (dispatch) => ({
    sendFormData: (data) => dispatch(dispatchSetUser(normalize(data))),
  }),
)(User);
