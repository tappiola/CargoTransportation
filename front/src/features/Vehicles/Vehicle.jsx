import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { vehiclesResolver as resolver } from './vehiclesResolver';
import { setVehicles, updateVehicles } from './vehiclesSlice';
import SubmitButton from 'components/Buttons/SubmitButton';
import BaseField from 'components/ControlledField';
import { usePending } from 'utils';

const selector = (vehicleId) => ({ vehicles }) => vehicles.vehiclesData.find(
  ({ id }) => id.toString() === vehicleId,
);

const normalize = ({ ...data }, id) => ({
  ...data,
  id,
});

function Vehicle() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const defaultValues = useSelector(selector(id));
  const methods = useForm({ defaultValues, resolver });
  const { handleSubmit } = methods;

  const sendFormData = (vehicleId, formData) => dispatch(
    vehicleId
      ? updateVehicles(normalize(formData, vehicleId))
      : setVehicles(normalize(formData)),
  );

  const { bindPending, handler } = usePending(sendFormData.bind(null, id));

  return (
    <Container maxWidth="sm">
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(handler)}>
          <Grid container direction="column">
            <BaseField name="number" label="Название" />
            <SubmitButton {...bindPending}>Готово</SubmitButton>
          </Grid>
        </form>
      </FormProvider>
    </Container>
  );
}

export default Vehicle;
