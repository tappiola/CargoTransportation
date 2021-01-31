/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  Button, List, ListItem, Typography, IconButton, makeStyles,
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import { format } from 'date-fns';

// import { clientResolver as resolver } from './clientResolver';
import Index from 'components/Buttons/BackButton';
import SubmitButton from 'components/Buttons/SubmitButton';
import BaseField from 'components/ControlledField';
import CustomGrid from 'components/DataGrid';
import * as COLUMNS from 'components/DataGrid/gridColumns';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';
import PaddedPaper from 'components/PaddedPaper';
import { dispatchSetClient, dispatchUpdateClient } from 'redux/actions';
import { usePending } from 'utils';

const useStyles = makeStyles((theme) => ({
  footer: {
    margin: theme.spacing(2, 2, 1),
    display: 'flex',
    alignItems: 'end',
  },
  point: {
    '&:before': {
      border: 'hidden',
    },
  },
}));

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
        {children.map((Child) => (
          <Grid xs={12} md={12 / children.length} item key={JSON.stringify(Child.props)}>
            { Child }
          </Grid>
        ))}
      </Grid>
    ) : children}
  </>
);

const DateField = ({ ...props }) => <BaseField {...props} type="date" InputLabelProps={{ shrink: true }} />;
const DateTimeField = ({ ...props }) => <BaseField {...props} type="datetime-local" InputLabelProps={{ shrink: true }} />;

function Waybill() {
  const classes = useStyles();
  const { id: waybillId } = useParams();
  const controlPoints = [
    { id: 0, point: 'Смоленск', date: '2020-01-30T09:00' },
    { id: 1, point: 'Воронеж', date: '2020-01-30T21:00' },
    { id: 2, point: 'Магнитогорск', date: '2020-01-31T07:00' },
  ];
  const [points, setPoints] = useState(controlPoints);
  const myHeight = points.length * 42 + 110;
  const defaultValues = useSelector(selector(Number(waybillId)));
  const dispatch = useDispatch();
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  const sendFormData = (clientId) => (formData) => dispatch(
    clientId
      ? dispatchUpdateClient(formData, clientId)
      : dispatchSetClient(formData),
  );

  const addEmptyPoint = () => {
    const emptyPoint = { id: points[points.length - 1].id + 1, point: '', date: format(Date.now(), 'yyyy-MM-dd\'T\'HH:mm') };
    setPoints([...points, emptyPoint]);
  };

  const deletePoint = (id) => setPoints(
    (prevPoints) => prevPoints.filter(({ id: _id }) => _id !== id),
  );

  function GridFooter(state) {
    return (
      <Grid className={classes.footer}>
        <Button onClick={addEmptyPoint} size="small" variant="contained" color="primary" disabled={points.length >= 9}>
          Добавить
        </Button>
      </Grid>
    );
  }
  const { bindPending, handler } = usePending(sendFormData(waybillId));
  const columns = [
    {
      field: ' ',
      flex: 1,
      headerName: '',
      renderCell: ({ row }) => (
        <IconButton size="small" onClick={() => deletePoint(row.id)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
    {
      field: 'point',
      headerName: 'Пункт назначения',
      flex: 5,
      renderCell: ({ value, row }) => (
        <BaseField
          name={`points.${row.id}.name`}
          defaultValue={value}
          size="small"
          InputProps={{ classes: { underline: classes.point } }}
        />
      ),
    },
    {
      field: 'date',
      headerName: 'Время прохождения',
      flex: 6,
      renderCell: ({ row }) => (
        <DateTimeField
          name={`controlPoint.${row.id}.date`}
          defaultValue={row.date}
          InputProps={{ classes: { underline: classes.point } }}
        />
      ),
    },
  ];
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
              <BaseField name="vehicle" label="Марка, номер" disabled />
              <BaseField name="driver.shortFullName" label="Водитель" disabled />
            </Row>

            <Row title="Начальная точка маршрута">
              <BaseField name="client.shortFullName" label="Отправитель" disabled />
              <BaseField name="fullAddress" label="Адрес" disabled />
              <DateTimeField name="departedAt" label="Дата выезда" />
            </Row>

            <Row title="Начальная точка маршрута">
              <BaseField name="warehouse.name" label="Получатель" disabled />
              <BaseField name="warehouse.fullAddress" label="Адрес" disabled />
              <DateTimeField name="expectedArrivalAt" label="Дата прибытия" />
            </Row>
            <Typography color="primary" variant="subtitle1" style={{ marginTop: 24 }}>
              Контрольные точки
            </Typography>
            <Grid style={{ height: myHeight }}>
              <CustomGrid
                pagination
                rows={points}
                columns={columns}
                checkboxSelection={false}
                hideFooter
                components={{
                  footer: GridFooter,
                }}
              />
            </Grid>
          </PaddedPaper>
          <SubmitButton {...bindPending}>Готово</SubmitButton>
        </form>
      </FormProvider>
    </Container>
  );
}

export default Waybill;
