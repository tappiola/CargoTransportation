import React, {useContext, useEffect} from 'react';

import {FormProvider, useForm} from "react-hook-form";
import {consignmentNoteResolver as resolver} from "./consignmentNoteResolver";
import PaddedContainer from "../../../components/PaddedContainer";
import makeStyles from "@material-ui/styles/makeStyles";
import {useDispatch} from "react-redux";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import GridToolbar from "../../../components/GridToolbar";
import SubmitButton from "components/Buttons/SubmitButton";
import {usePending} from "utils";
import {dispatchCreateConsignmentNote} from "../../../redux/actions/consignmentNotes";
import Goods from './Goods';
import ClientForm from "./ClientForm";
import ConsignmentNoteForm from "./ConsignmentNoteForm";
import DriverForm from "./DriverForm";
import ManagerForm from './ManagerForm';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  paper: {
    padding: theme.spacing(3),
    overflow: 'auto',
    marginBottom: theme.spacing(3),
  },
}));

const normalize = (formData) => {
  const {consignmentNoteNumber, client, manager, driver, ...other} = formData;
  return {
    ...other,
    number: Number(consignmentNoteNumber),
    clientId: client.id,
    driverId: driver.id,
    assignedToId: manager.id,
    goods: [] // TODO
  };
}

function Title({children}) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  );
}

function ConsignmentNoteNew() {

  const methods = useForm({resolver});
  const {handleSubmit} = methods;
  const classes = useStyles();
  const dispatch = useDispatch();
  const sendFormData = (formData) => dispatch(dispatchCreateConsignmentNote(normalize(formData)));

  const {bindPending, handler} = usePending(sendFormData);

  return (
    <PaddedContainer>
      {/*<NavButton variant="outlined" color="primary" to={'/consignment-notes'}>К списку ТТН</NavButton>*/}
      <GridToolbar title="Добавление ТТН"/>
      <FormProvider {...methods}>
        <form
          // noValidate
          onSubmit={handleSubmit(handler)}
        >
          <Paper className={classes.paper}>
            <Title>Шаг 1 - выберите клиента</Title>
            <ClientForm/>
          </Paper>
          <Paper className={classes.paper}>
            <Title>Шаг 2 - заполните данные ТТН</Title>
            <ConsignmentNoteForm/>
          </Paper>
          <Paper className={classes.paper}>
            <Title>Шаг 3 - введите данные водителя</Title>
            <DriverForm/>
          </Paper>
          <Paper className={classes.paper}>
            <Title>Шаг 4 - введите данные о грузе</Title>
            <Goods/>
          </Paper>
          <Paper className={classes.paper}>
            <Title>Шаг 5 - выберите менеджера для обработки ТТН</Title>
            <ManagerForm/>
          </Paper>
          <SubmitButton {...bindPending}>Готово</SubmitButton>
        </form>
      </FormProvider>
    </PaddedContainer>
  );
}

export default ConsignmentNoteNew;
