import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { Container, Grid, Typography } from '@material-ui/core';
import { format, parseISO } from 'date-fns';

import { PointsGrid } from './PointsGrid';
import { waybillResolver as resolver } from './waybillResolver';
import { updateWaybill } from './waybillsSlice';
import * as api from 'api';
import Index from 'components/Buttons/BackButton';
import SubmitButton from 'components/Buttons/SubmitButton';
import BaseField, { DateField } from 'components/ControlledField';
import GridToolbar from 'components/GridToolbar';
import PaddedPaper from 'components/PaddedPaper';
import { DATE } from 'constants/dateFormats';
import { usePending } from 'utils';

const Row = ({ children, title }) => (
  <>
    <Typography color="primary" variant="subtitle1">{title}</Typography>
    {children.length ? (
      <Grid container spacing={2}>
        {children.map((Child) => (
          <Grid xs={12} md={12 / children.length} item key={JSON.stringify(Child.props)}>
            { Child}
          </Grid>
        ))}
      </Grid>
    ) : children}
  </>
);

function Waybill() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id: waybillId } = useParams();
  const { consignmentNotesData } = useSelector(({ consignmentNotes }) => consignmentNotes);
  const methods = useForm({ resolver });
  const { handleSubmit, errors, reset } = methods;
  const sendFormData = (id) => (data) => (
    dispatch(updateWaybill({ id, data }))
      .then(() => history.push('./'))
  );

  const { bindPending, handler } = usePending(sendFormData(waybillId));

  useEffect(async () => {
    const { waybill } = await api.getWaybill(waybillId);
    const { fullAddress, departedAt, expectedArrivalAt, consignmentNoteId } = waybill;

    const consignmentNote = consignmentNotesData.find(({ id }) => id === consignmentNoteId);
    const { driver, vehicle, issuedDate, number, client } = consignmentNote;

    reset({
      client: {
        ...client,
        fullAddress,
        departedAt: departedAt ? format(parseISO(departedAt), DATE) : '',
      },
      vehicle: {
        number: vehicle,
        driver: driver.shortFullName,
      },
      consignmentNote: {
        issuedDate: format(parseISO(issuedDate), DATE),
        number,
      },
      waybill: {
        number: waybillId,
        issuedDate: format(new Date(), DATE),
      },
      warehouse: {
        ...waybill.warehouse,
        expectedArrivalAt: expectedArrivalAt ? format(parseISO(expectedArrivalAt), DATE) : '',
      },
    });
  }, []);

  return (
    <Container maxWidth="md">
      <Index link="/waybills" text="К списку путевых листов" />
      <GridToolbar title="Оформление путевого листа" />

      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(handler)}>
          <PaddedPaper>
            <Row title="Накладная">
              <BaseField name="consignmentNote.number" label="Номер" disabled />
              <DateField name="consignmentNote.issuedDate" label="Дата оформления" disabled />
            </Row>
            <Row title="Путевой лист">
              <BaseField name="waybill.number" label="Номер" disabled />
              <DateField name="waybill.issuedDate" label="Дата оформления" disabled />
            </Row>
            <Row title="Автомобиль">
              <BaseField name="vehicle.number" label="Марка, номер" disabled />
              <BaseField name="vehicle.driver" label="Водитель" disabled />
            </Row>
            <Row title="Начальная точка маршрута">
              <BaseField name="client.shortFullName" label="Отправитель" disabled />
              <BaseField name="client.fullAddress" label="Адрес" disabled />
              <DateField name="client.departedAt" label="Дата выезда" />
            </Row>
            <Row title="Конечная точка маршрута">
              <BaseField name="warehouse.name" label="Получатель" disabled />
              <BaseField name="warehouse.fullAddress" label="Адрес" disabled />
              <DateField name="warehouse.expectedArrivalAt" label="Дата прибытия" />
            </Row>
            <Typography color="primary" variant="subtitle1" style={{ marginTop: 24 }}>
              Контрольные точки
            </Typography>
            <PointsGrid errors={errors.points} />
          </PaddedPaper>
          <SubmitButton {...bindPending}>Готово</SubmitButton>
        </form>
      </FormProvider>
    </Container>
  );
}

export default Waybill;
