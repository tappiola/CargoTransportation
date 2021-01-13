import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  dispatchSetEmployee,
  dispatchUpdateEmployee,
} from 'redux/actions/employees';

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
import { employeeResolver as resolver } from './employeeResolver';

const ALLOWED_ROLES = Object.entries(ROLE_NAMES).filter(
  ([name]) => name !== ROLES.GLOBAL_ADMIN,
);

// temporary solution
const preNormalize = (data, id) => {
  if (!id) return undefined;
  const currentEmployeer = data.find(({ id: _id }) => _id.toString() === id);
  if (!currentEmployeer) {
    return undefined;
  }
  return {
    roles: [],
    birthday: '1993-07-05',
    ...currentEmployeer,
    country: currentEmployeer.country || 'Беларусь',
  };
};

function Employee({ data, sendFormData }) {
  const { id } = useParams();
  const defaultValues = preNormalize(data, id);
  const methods = useForm({ defaultValues, resolver });
  const { register, handleSubmit, errors } = methods;
  console.log(data);
  return (
    <Container maxWidth="sm">
      <FormProvider {...methods}>
        <form
          noValidate
          onSubmit={handleSubmit((formData) => {
            sendFormData(id, formData);
          })}
        >
          <Grid container direction="column">
            <BaseField name="lastName" label="Фамилия" />
            <BaseField name="firstName" label="Имя" />
            <BaseField name="middleName" label="Отчество" />
            <BaseField name="login" label="логин" />
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

            <BaseField
              name="birthday"
              type="date"
              label="Дата рождения"
              InputLabelProps={{ shrink: true }}
            />

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
              <FormLabel>Статус: </FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={(
                    <Checkbox
                      inputRef={register}
                      name="isActive"
                      defaultChecked={defaultValues?.isActive}
                    />
                  )}
                />
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
  ({ employees }) => ({ data: employees.employeesData }),
  (dispatch) => ({
    sendFormData: (id, data) => (id
      ? dispatch(dispatchUpdateEmployee(normalize({ ...data }, id)))
      : dispatch(dispatchSetEmployee(normalize(data)))),
  }),
)(Employee);
