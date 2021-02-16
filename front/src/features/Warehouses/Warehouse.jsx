import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import { enqueueToast } from 'features/Notifier/NotifierSlice';

import { warehouseResolver as resolver } from './warehouseResolver';
import { dispatchSetWarehouse, dispatchUpdateWarehouse } from './warehousesSlice';
import Index from 'components/Buttons/BackButton';
import SubmitButton from 'components/Buttons/SubmitButton';
import BaseField from 'components/ControlledField';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';
import PaddedPaper from 'components/PaddedPaper';
import { TOAST_TYPES } from 'constants/toastsTypes';
import { usePending } from 'utils';

const selector = (warehouseId) => ({ warehouses }) => warehouses.warehousesData.find(
  ({ id }) => id.toString() === warehouseId,
);

function User() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { id } = useParams();
  const defaultValues = useSelector(selector(id));
  const methods = useForm({ defaultValues, resolver });
  const { register, handleSubmit } = methods;

  const sendFormData = (clientId) => (formData) => dispatch(
    clientId
      ? dispatchUpdateWarehouse(formData, clientId)
      : dispatchSetWarehouse(formData),
  )
    .then(() => history.push('/warehouses'))
    .catch((e) => {
      dispatch(enqueueToast({
        message: `Ошибка при создании склада: ${e.message}`,
        type: TOAST_TYPES.ERROR,
      }));
    });

  const { bindPending, handler } = usePending(sendFormData(id));

  return (
    <PaddedContainer>
      <Index link="/warehouses" text="К списку складов" />
      <GridToolbar title="Добавление склада" />
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(handler)}>

          <PaddedPaper title="Основные данные">
            <Grid container spacing={3} justify="space-between">
              <Grid item xs={12} sm={6}>
                <BaseField name="name" label="Название" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <BaseField name="email" label="Контактный email" />
              </Grid>
            </Grid>
          </PaddedPaper>

          <PaddedPaper title="Адрес">
            <Grid container spacing={3} justify="space-between">
              <Grid item xs={12} sm={6}>
                <BaseField name="country" label="Страна" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <BaseField name="city" label="Город" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <BaseField name="street" label="Улица" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <BaseField name="house" label="Дом" />
              </Grid>
            </Grid>
          </PaddedPaper>

          <PaddedPaper title="Статус в системе">
            <FormControl margin="normal">
              <FormGroup>
                <FormControlLabel
                  control={(
                    <Checkbox
                      inputRef={register}
                      name="isTrusted"
                      defaultChecked={defaultValues?.isTrusted}
                    />
                  )}
                  label="Доверенный"
                />
              </FormGroup>
            </FormControl>
          </PaddedPaper>

          <SubmitButton {...bindPending}>Готово</SubmitButton>
        </form>
      </FormProvider>
    </PaddedContainer>
  );
}

export default User;
