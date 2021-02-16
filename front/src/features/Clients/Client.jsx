import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import { enqueueToast } from 'features/Notifier/NotifierSlice';

import { clientResolver as resolver } from './clientResolver';
import { dispatchSetClient, dispatchUpdateClient, dispatchGetClients } from './clientsSlice';
import BackButton from 'components/Buttons/BackButton';
import SubmitButton from 'components/Buttons/SubmitButton';
import BaseField from 'components/ControlledField';
import PaddedContainer from 'components/PaddedContainer';
import { TOAST_TYPES } from 'constants/toastsTypes';
import { URLS } from 'constants/urls';
import { usePending } from 'utils';

const selector = (id) => ({ clients }) => clients.clientsData.find(
  ({ id: _id }) => _id.toString() === id,
);

function Client({ isPopup = false, onPopupClose }) {
  const history = useHistory();
  const { id } = useParams();
  const defaultValues = useSelector(selector(id));
  const dispatch = useDispatch();
  const methods = useForm({ defaultValues, resolver });
  const { register, handleSubmit } = methods;

  const sendFormData = (clientId) => (formData) => dispatch(
    clientId
      ? dispatchUpdateClient(formData, clientId)
      : dispatchSetClient(formData),
  ).then(() => {
    if (isPopup) {
      onPopupClose();
      dispatch(dispatchGetClients());
    } else {
      history.push(URLS.CLIENTS);
    }
  })
    .catch((e) => {
      dispatch(enqueueToast({
        message: `Ошибка при создании клиента: ${e.message}`,
        type: TOAST_TYPES.ERROR,
      }));
    });

  const { bindPending, handler } = usePending(sendFormData(id));

  return (
    <PaddedContainer>
      {!isPopup && <BackButton link="/clients" text="К списку клиентов" />}
      <Container maxWidth="sm">
        <FormProvider {...methods}>
          <form noValidate onSubmit={handleSubmit(handler)}>
            <Grid container direction="column">
              <BaseField name="lastName" label="Фамилия" />
              <BaseField name="firstName" label="Имя" />
              <BaseField name="middleName" label="Отчество" />
              <BaseField name="email" label="email" />
              <BaseField name="companyName" label="Компания" />

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
                <Grid item xs={12} sm={6}>
                  <BaseField name="house" label="Дом" />
                </Grid>
              </Grid>

              <BaseField
                name="birthday"
                type="date"
                label="Дата рождения"
                InputLabelProps={{ shrink: true }}
              />
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
              <SubmitButton {...bindPending}>Готово</SubmitButton>
            </Grid>
          </form>
        </FormProvider>
      </Container>
    </PaddedContainer>
  );
}

export default Client;
