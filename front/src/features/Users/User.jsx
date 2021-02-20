import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';

import { userResolver as resolver } from './userResolver';
import { setUser, updateUser } from './usersSlice';
import SubmitButton from 'components/Buttons/SubmitButton';
import ControlledAutocomplete from 'components/ControlledAutocomplete';
import BaseField, { DateField } from 'components/ControlledField';
import { ROLE_NAMES, ROLES } from 'constants/permissions';
import { usePending } from 'utils';

const ALLOWED_ROLES = Object.entries(ROLE_NAMES).filter(
  ([name]) => name !== ROLES.GLOBAL_ADMIN,
);

const selector = (id) => ({ users, companies: { companiesData } }) => {
  const user = users.usersData.find(({ id: _id }) => _id.toString() === id);
  const roles = user?.roles && user.roles.map(({ role }) => role);
  const company = companiesData.find(({ id: _id }) => _id === user?.companyId);

  return user ? { ...user, roles, company, companiesData } : { companiesData };
};

const normalize = ({ roles: asObj, company, ...data }, id) => ({
  ...data,
  id,
  companyId: company.id,
  roles: Object.entries(asObj || {})
    .filter(([, checked]) => checked)
    .map(([role]) => role),
});

function User() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { companiesData, ...defaultValues } = useSelector(selector(id));
  const methods = useForm({ defaultValues, resolver });
  const { register, handleSubmit, errors } = methods;

  const sendFormData = (userId) => (formData) => dispatch(
    userId
      ? updateUser(normalize(formData, userId))
      : setUser(normalize(formData)),
  );

  const { bindPending, handler } = usePending(sendFormData(id));

  const getOption = ({ name: option }, { name: value }) => (!option) || option === value;

  return (
    <Container maxWidth="sm">
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(handler)}>
          <Grid container direction="column">
            <ControlledAutocomplete
              name="company"
              fieldName="name"
              options={companiesData}
              getOptionLabel={(option) => option.name || ''}
              getOptionSelected={getOption}
              label="Компания"
              defaultValue={{}}
            />

            <BaseField name="lastName" label="Фамилия" />
            <BaseField name="firstName" label="Имя" />
            <BaseField name="middleName" label="Отчество" />
            <BaseField name="email" label="email" />

            {id && <BaseField name="password" label="Пароль" type="password" />}

            <Grid container spacing={1} justify="space-between">
              <Grid item xs={12} sm={6}>
                <BaseField name="country" label="Страна" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <BaseField name="city" label="Город" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <BaseField name="street" label="Улица" />
              </Grid>
              <Grid item xs={12} sm={2}>
                <BaseField name="house" label="Дом" />
              </Grid>
              <Grid item xs={12} sm={2}>
                <BaseField name="apartment" label="Квартира" />
              </Grid>
            </Grid>

            <DateField name="birthday" label="Дата рождения" />

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
                        defaultChecked={defaultValues?.roles?.includes(name)}
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
            <SubmitButton {...bindPending}>Готово</SubmitButton>
          </Grid>
        </form>
      </FormProvider>
    </Container>
  );
}

export default User;
