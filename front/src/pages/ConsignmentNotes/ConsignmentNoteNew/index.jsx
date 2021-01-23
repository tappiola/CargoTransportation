import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import { format } from 'date-fns';

import ClientForm from './ClientForm';
import ConsignmentNoteForm from './ConsignmentNoteForm';
import DriverForm from './DriverForm';
import Goods from './Goods';
import ManagerForm from './ManagerForm';
import { consignmentNoteResolver as resolver } from './resolvers';
import NavButton from 'components/Buttons/NavButton';
import SubmitButton from 'components/Buttons/SubmitButton';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';
import { dispatchCreateConsignmentNote } from 'redux/actions/consignmentNotes';
import { usePending } from 'utils';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    overflow: 'auto',
    marginBottom: theme.spacing(3),
  },
}));

const normalize = (formData) => {
  const {
    consignmentNoteNumber, client, manager, driver, passportIssuedAt, goods, ...other
  } = formData;
  const goodsData = goods.map(({ id, ...data }) => data);
  return {
    ...other,
    number: Number(consignmentNoteNumber),
    clientId: client.id,
    driverId: driver.id,
    passportIssuedAt: format(passportIssuedAt, 'yyyy-MM-dd'),
    assignedToId: manager.id,
    goods: goodsData,
  };
};

function Title({ children }) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  );
}

function ConsignmentNoteNew() {
  const classes = useStyles();
  const history = useHistory();
  const redirect = () => Promise.resolve(history.push('/consignment-notes'));

  const methods = useForm({ resolver, mode: 'onBlur' });
  const { handleSubmit } = methods;
  const dispatch = useDispatch();
  const sendFormData = (formData) => {
    dispatch(dispatchCreateConsignmentNote(normalize(formData))).then(redirect);
  };
  const { bindPending, handler } = usePending(sendFormData);

  return (
    <PaddedContainer>
      <NavButton variant="outlined" color="primary" to="/consignment-notes">К списку ТТН</NavButton>
      <GridToolbar title="Добавление ТТН" />
      <FormProvider {...methods}>
        <form
          // noValidate
          onSubmit={handleSubmit(handler)}
        >
          <Paper className={classes.paper}>
            <Title>Шаг 1 - выберите клиента</Title>
            <ClientForm />
          </Paper>
          <Paper className={classes.paper}>
            <Title>Шаг 2 - заполните данные ТТН</Title>
            <ConsignmentNoteForm />
          </Paper>
          <Paper className={classes.paper}>
            <Title>Шаг 3 - введите данные водителя</Title>
            <DriverForm />
          </Paper>
          <Paper className={classes.paper}>
            <Title>Шаг 4 - введите данные о грузе</Title>
            <Goods />
          </Paper>
          <Paper className={classes.paper}>
            <Title>Шаг 5 - выберите менеджера для обработки ТТН</Title>
            <ManagerForm />
          </Paper>
          <SubmitButton {...bindPending}>Готово</SubmitButton>
        </form>
      </FormProvider>
    </PaddedContainer>
  );
}

export default ConsignmentNoteNew;
