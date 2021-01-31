/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { format, parseISO } from 'date-fns';

import { PointsGrid } from './PointsGrid';
import { waybillResolver as resolver } from './waybillResolver';
import * as api from 'api';
import Index from 'components/Buttons/BackButton';
import SubmitButton from 'components/Buttons/SubmitButton';
import BaseField, { DateField } from 'components/ControlledField';
import GridToolbar from 'components/GridToolbar';
import PaddedPaper from 'components/PaddedPaper';
import { DATE } from 'constants/dateFormats';
import { usePending } from 'utils';

const formatDate = (dirtyDate) => {
  try {
    return (typeof dirtyDate === 'string')
      ? format(parseISO(dirtyDate), DATE)
      : format(dirtyDate, DATE);
  } catch {
    return dirtyDate;
  }
};

const selector = (id) => ({ waybills, consignmentNotes: { consignmentNotesData } }) => {
  const waybill = waybills.waybillsData.find(({ id: _id }) => id === _id);
  const note = consignmentNotesData.find(({ number: n }) => n === +waybill.consignment_note.number);

  const { fullAddress, departedAt, expectedArrivalAt } = waybill;
  const { driver, vehicle, issuedDate } = note;

  return {
    client: {
      ...note.client,
      fullAddress,
      departedAt: formatDate(departedAt, DATE),
    },
    vehicle: {
      number: vehicle,
      driver: driver.shortFullName,
    },
    consignmentNote: {
      issuedDate: formatDate(issuedDate, DATE),
      number: waybill.consignment_note.number,
    },
    waybill: {
      number: id,
      issuedDate: formatDate(Date.now(), DATE),
    },
    warehouse: {
      expectedArrivalAt: formatDate(expectedArrivalAt, DATE),
      ...waybill.warehouse,
    },
  };
};

const Row = ({ children, title }) => (
  <>
    <Typography color="primary" variant="subtitle1">{title}</Typography>
    {children.length ? (
      <Grid container spacing={2}>
        {children.map((Child) => (
          <Grid xs={12} md={12 / children.length} item key={JSON.stringify(Child.props)}>
            { Child }
          </Grid>
        ))}
      </Grid>
    ) : children}
  </>
);

function Waybill() {
  const { id: waybillId } = useParams();
  const defaultValues = useSelector(selector(+waybillId));
  const methods = useForm({ defaultValues, resolver });
  const { handleSubmit, errors } = methods;

  const sendFormData = (id) => ({ points: ps, ...data }) => (
    api.updateWaybill(id, { ...data, points: ps.map((p) => p) })
  );
  const { bindPending, handler } = usePending(sendFormData(waybillId));

  return (
    <Container maxWidth="md">
      <Index link="/waybills" text="К списку путевых листов" />
      <GridToolbar title="Оформление путевого листа" />

      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(handler)}>
          <PaddedPaper>

            <Row title="Накладная">
              <BaseField name="consignmentNote.number" label="Номер" disabled />
              <DateField name="consignmentNote.issuedDate" label="Дата" disabled />
            </Row>

            <Row title="Путевой лист">
              <BaseField name="waybill.number" label="Номер" disabled />
              <BaseField name="waybill.issuedDate" label="Дата оформления" disabled />
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
