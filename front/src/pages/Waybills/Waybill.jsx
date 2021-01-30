import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  Button, List, ListItem, Typography,
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { format } from 'date-fns';

// import { clientResolver as resolver } from './clientResolver';
import Index from 'components/Buttons/BackButton';
import SubmitButton from 'components/Buttons/SubmitButton';
import BaseField from 'components/ControlledField';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';
import PaddedPaper from 'components/PaddedPaper';
import { dispatchSetClient, dispatchUpdateClient } from 'redux/actions';
import { usePending } from 'utils';

const selector = (id) => ({ waybills, consignmentNotes }) => {
  const waybill = waybills.waybillsData.find(({ id: _id }) => id === _id);
  const number = Number(waybill.consignment_note.number);
  const note = consignmentNotes.consignmentNotesData.find(({ number: num }) => number === num);
  const {
    fullAddress, departedAt, expectedArrivalAt, warehouse,
  } = waybill;
  const {
    client, driver, vehicle, issuedDate,
  } = note;
  // console.clear();
  console.log(note, waybill);
  return {
    client,
    driver,
    vehicle,
    consignmentNote: {
      issuedDate,
      number,
    },
    waybill: {
      number: id,
      issuedDate: format(Date.now(), 'yyyy-MM-dd'),
    },
    fullAddress,
    departedAt,
    expectedArrivalAt,
    warehouse,
  };
};

const Row = ({ children, title }) => (
  <>
    <Typography color="primary" variant="subtitle1">{title}</Typography>
    {children.length ? (
      <Grid container spacing={2}>
        {children.map((Child) => <Grid xs={12} md={12 / children.length} item>{ Child }</Grid>)}
      </Grid>
    ) : children}
  </>
);

const DateField = ({ ...props }) => <BaseField {...props} type="date" InputLabelProps={{ shrink: true }} />;

function Waybill() {
  const { id } = useParams();
  const controlPoints = [
    { point: 'Смоленск', date: '2020-01-30' },
    { point: 'Воронеж', date: '2020-01-30' },
    { point: 'Магнитогорск', date: '2020-01-31' },
  ];
  const [points, setPoints] = useState(controlPoints);
  const defaultValues = useSelector(selector(Number(id)));
  const dispatch = useDispatch();
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  const sendFormData = (clientId) => (formData) => dispatch(
    clientId
      ? dispatchUpdateClient(formData, clientId)
      : dispatchSetClient(formData),
  );

  const addEmptyPoint = () => {
    const emptyPoint = { point: '', date: format(Date.now(), 'yyyy-MM-dd') };
    setPoints([...points, emptyPoint]);
  };

  const { bindPending, handler } = usePending(sendFormData(id));

  return (
    <Container maxWidth="md">
      <PaddedContainer>
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
                <BaseField name="vehicle" label="Марка, номер" disabled />
                <BaseField name="driver.shortFullName" label="Водитель" disabled />
              </Row>
              <Row title="Начальная точка маршрута">
                <BaseField name="client.shortFullName" label="Отправитель" disabled />
                <BaseField name="fullAddress" label="Адрес" disabled />
                <DateField name="departedAt" label="Дата выезда" />
              </Row>
              <Row title="Начальная точка маршрута">
                <BaseField name="warehouse.name" label="Получатель" disabled />
                <BaseField name="warehouse.fullAddress" label="Адрес" disabled />
                <DateField name="expectedArrivalAt" label="Дата прибытия" />
              </Row>
              <Row title="Добавить промежуточные точки">
                <List>
                  {points.map(({ point, date }, index) => (
                    <ListItem>
                      <BaseField name={`controlPoint.${index}.name`} defaultValue={point} />
                      <DateField name={`controlPoint.${index}.date`} defaultValue={date} />
                    </ListItem>
                  ))}
                </List>
              </Row>
              <Button onClick={addEmptyPoint}>
                Добавит Контрольную точку
              </Button>
            </PaddedPaper>

            <SubmitButton {...bindPending}>Готово</SubmitButton>
          </form>
        </FormProvider>
      </PaddedContainer>
    </Container>
  );
}

export default Waybill;
