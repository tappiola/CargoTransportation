import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';

import { employeeResolver as resolver } from './employeeResolver';
import SubmitButton from 'components/Buttons/SubmitButton';
import BaseField from 'components/ControlledField';
import { ROLE_NAMES, ROLES } from 'constants/permissions';
import {
  dispatchSetEmployee,
  dispatchUpdateEmployee,
} from 'redux/actions/employees';

const ALLOWED_ROLES = Object.entries(ROLE_NAMES).filter(
  ([name]) => name !== ROLES.GLOBAL_ADMIN,
);

const selector = (employeeId) => ({ currentUser, employees }) => {
  const employee = employees.employeesData.find(({ id: _id }) => _id.toString() === employeeId);
  const roles = employee && employee.roles.map(({ role }) => role);

  return {
    companyId: currentUser.companyId,
    defaultValues: employeeId && { ...employee, roles },
  };
};

const normalize = ({ roles: asObj, ...data }, id) => ({
  ...data,
  id,
  roles: Object.entries(asObj)
    .filter(([, checked]) => checked)
    .map(([role]) => role),
});

function Employee() {
  const dispatch = useDispatch();
  const { id: employeeId } = useParams();
  const { companyId, defaultValues } = useSelector(selector(employeeId));
  const methods = useForm({ defaultValues, resolver });
  const { register, handleSubmit, errors } = methods;

  return (
    <Container maxWidth="sm">
      <FormProvider {...methods}>
        <form
          noValidate
          onSubmit={handleSubmit((formData) => (
            employeeId
              ? dispatch(dispatchUpdateEmployee(normalize({ ...formData }, employeeId)))
              : dispatch(dispatchSetEmployee({ ...normalize(formData), companyId }))
          ))}
        >
          <Grid container direction="column">
            <BaseField name="lastName" label="Фамилия" />
            <BaseField name="firstName" label="Имя" />
            <BaseField name="middleName" label="Отчество" />
            {/* <BaseField name="login" label="логин" /> */}
            <BaseField name="email" label="email" />

            {employeeId && <BaseField name="password" label="Пароль" type="password" />}

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

            <FormControl margin="normal">
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
                  label="Активен"
                />
              </FormGroup>
            </FormControl>

            <SubmitButton>Готово</SubmitButton>
          </Grid>
        </form>
      </FormProvider>
    </Container>
  );
}

export default Employee;
