import React, {useEffect, useState} from 'react';

import Grid from '@material-ui/core/Grid';
import * as api from 'api';

import BaseField from '../../components/ControlledField';
import {FormProvider, useForm} from "react-hook-form";
import {consignmentNoteResolver as resolver} from "../ConsignmentNotes/consignmentNoteResolver";
import PaddedContainer from "../../components/PaddedContainer";
import makeStyles from "@material-ui/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import NavButton from "../../components/Buttons/NavButton";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import GridToolbar from "../../components/GridToolbar";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditOutlined";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import Input from "@material-ui/core/Input";
import Tooltip from "@material-ui/core/Tooltip";
import {ConfirmDialog} from "@tappiola/material-ui-externals";
import Button from "@material-ui/core/Button";
import SubmitButton from "components/Buttons/SubmitButton";
import {usePending} from "utils";
import ControlledAutocomplete from "components/ControlledAutocomplete";
import {dispatchCreateConsignmentNote} from "../../redux/actions/consignmentNotes";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(3),
    overflow: 'auto',
    marginBottom: theme.spacing(3),
  },
  //table
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  selectTableCell: {
    width: 60
  },
  tableCell: {
    width: 130,
    height: 40
  },
  input: {
    width: 130,
    height: 40
  }
}));

const createData = (name, quantity, measurement, cost, remarks, isEditMode = false) => ({
  id: name ? name.replace(" ", "_") : '777',
  name,
  quantity, measurement, cost, remarks,
  isEditMode
});

const CustomTableCell = ({row, name, onChange}) => {
  const classes = useStyles();
  const {isEditMode} = row;
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={e => onChange(e, row)}
          className={classes.input}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

function Title({children}) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  );
}

function ConsignmentNoteNew() {

  const {clientsData} = useSelector(({clients}) => clients);
  const {employeesData} = useSelector(({employees}) => employees);
  const driversData = employeesData.filter(u => u.roles.reduce((prev, next) => [...prev, next.role], []).includes('driver'));
  const methods = useForm({resolver});
  const {handleSubmit, control, setValue} = methods;

  const classes = useStyles();

  const dispatch = useDispatch();
  const sendFormData = (formData) => dispatch(dispatchCreateConsignmentNote(formData));
  // const sendFormData = data => console.log(data);

  const {bindPending, handler} = usePending(sendFormData);

  const [driverId, setDriverId] = useState();
  const [passportData, setPassportData] = useState({});

  useEffect(() => {
    if (driverId) {

      api.getDocuments(driverId).then(data => {
        setPassportData(data);
        setValue('passportNumber', data.passportNumber, { shouldValidate: true });
        setValue('passportIssuedBy', data.passportIssuedBy, { shouldValidate: true });
        setValue('passportIssuedAt', data.passportIssuedAt, { shouldValidate: true });


      }

      );
    } else {
      setPassportData({});
      setValue('passportNumber', '');
      setValue('passportIssuedBy', '');
      setValue('passportIssuedAt', '');
    }
  }, [driverId]);

  // table
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState();
  const [rows, setRows] = React.useState([
    createData("Ламинат", 7, 'упаковка', 24, '-'),
    createData("Плинтус", 237, 'штука', 37, 'Хрупкий товар'),
    createData("Обои", 262, 'рулон', 24, '-')
  ]);
  const [previous, setPrevious] = React.useState({});

  const onToggleEditMode = id => {
    setRows(state => {
      return rows.map(row => {
        if (row.id === id) {
          return {...row, isEditMode: !row.isEditMode};
        }
        return row;
      });
    });
  };

  const onDelete = (rowId) => {
    setRows(rows => [...rows.filter(r => r.id !== rowId)]);
  }

  const onRowAdd = () => {
    setRows(rows => [...rows, createData('', '', '', '', '', true)]);
  }

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({...state, [row.id]: row}));
    }
    const value = e.target.value;
    const name = e.target.name;
    const {id} = row;
    const newRows = rows.map(row => {
      if (row.id === id) {
        return {...row, [name]: value};
      }
      return row;
    });
    setRows(newRows);
  };

  const onRevert = id => {
    const newRows = rows.map(row => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious(state => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

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
            <Grid container spacing={3} justify="space-between" alignItems="center">
              <Grid item xs={12} md={8} lg={9}>
                <ControlledAutocomplete
                  name="clientName"
                  fieldName="fullName"
                  options={clientsData}
                  getOptionLabel={(option) => option.fullName}
                  getOptionSelected={(option, value) => option.fullName === value.fullName}
                  label='ФИО'
                  defaultValue={{}}
                />
                {/*<FormControl className={classes.formControl}>*/}
                {/*  <Select value={client} onChange={handleClientChange} className={classes.selectEmpty}>*/}
                {/*    {clientsData.map(c => <MenuItem*/}
                {/*      key={c.id} value={c.id}>{c.fullName + (c.companyName ? ` (${c.companyName})` : '')}</MenuItem>)}*/}
                {/*  </Select>*/}
                {/*  <FormHelperText>Клиент</FormHelperText>*/}
                {/*</FormControl>*/}
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <NavButton variant="contained" color="secondary" to={'/clients/new'}>Добавить нового клиента</NavButton>
              </Grid>
            </Grid>
          </Paper>

          <Paper className={classes.paper}>
            <Title>Шаг 2 - заполните данные ТТН</Title>
            <Grid container spacing={3} justify="space-between" alignItems="center">
              <Grid item xs={12} md={6}>
                <BaseField name="consignmentNoteNumber" label="Номер"/>
              </Grid>
              <Grid item xs={12} md={6}>
                <BaseField
                  name="issuedDate"
                  label="Дата выдачи"
                  type="date"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  InputLabelProps={{shrink: true}}
                />
              </Grid>
            </Grid>
          </Paper>


          <Paper className={classes.paper}>
            <Title>Шаг 3 - введите данные водителя</Title>
            <Grid container spacing={3} justify="space-between" alignItems="center">
              <Grid item xs={12} md={7}>

                <ControlledAutocomplete
                  name="driverName"
                  fieldName="fullName"
                  options={driversData}
                  // options={[{fullName: 'test'}, {fullName: 'panda'}]}
                  getOptionLabel={(option) => option.fullName}
                  getOptionSelected={(option, value) => {
                    setDriverId(value.id);
                    return option.fullName === value.fullName
                  }}
                  label='ФИО'
                  defaultValue={{}}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <BaseField name="passportNumber" label="Номер паспорта" value={passportData.passportNumber}/>
              </Grid>
              <Grid item xs={12} md={7}>
                <BaseField name="passportIssuedBy" label="Место выдачи паспорта"/>
              </Grid>
              <Grid item xs={12} md={5}>
                <BaseField
                  name="passportIssuedAt"
                  label="Дата выдачи паспорта"
                  type="date"
                  InputLabelProps={{shrink: true}}
                />
              </Grid>
            </Grid>
          </Paper>


          <Paper className={classes.paper}>
            <Title>Шаг 4 - введите данные о грузе</Title>
            <Table className={classes.table} aria-label="caption table">
              <caption>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={onRowAdd}
                >Добавить товар</Button>
              </caption>
              <TableHead>
                <TableRow>
                  <TableCell align="left"/>
                  <TableCell align="left">Наименование</TableCell>
                  <TableCell align="left">Кол-во</TableCell>
                  <TableCell align="left">Единица измерения</TableCell>
                  <TableCell align="left">Стоимость (руб)</TableCell>
                  <TableCell align="left">Примечания</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell className={classes.selectTableCell}>
                      {row.isEditMode ? (
                        <>
                          <Tooltip title="Сохранить">
                            <IconButton
                              aria-label="done"
                              onClick={() => onToggleEditMode(row.id)}
                            >
                              <DoneIcon/>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Отменить">
                            <IconButton
                              aria-label="revert"
                              onClick={() => onRevert(row.id)}
                            >
                              <RevertIcon/>
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        <>
                          <Tooltip title="Редактировать">
                            <IconButton
                              aria-label="delete"
                              onClick={() => onToggleEditMode(row.id)}
                            >
                              <EditIcon/>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Удалить">
                            <IconButton
                              aria-label="delete"
                              onClick={() => {
                                setSelectedRowId(row.id);
                                setIsConfirmDialogOpen(true);
                              }}
                            >
                              <DeleteForeverOutlinedIcon/>
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                    </TableCell>
                    <CustomTableCell {...{row, name: "name", onChange}} />
                    <CustomTableCell {...{row, name: "quantity", onChange}} />
                    <CustomTableCell {...{row, name: "measurement", onChange}} />
                    <CustomTableCell {...{row, name: "cost", onChange}} />
                    <CustomTableCell {...{row, name: "remarks", onChange}} />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          <SubmitButton {...bindPending}>Готово</SubmitButton>
        </form>

      </FormProvider>
      {isConfirmDialogOpen && (
        <ConfirmDialog
          title="Удаление путевых листоы"
          description="Вы уверены, что хотите удалить выбранный товар"
          onPopupClose={() => setIsConfirmDialogOpen(false)}
          onActionConfirm={() => {
            setIsConfirmDialogOpen(false);
            onDelete(selectedRowId);
            setSelectedRowId(null);
          }}
        />
      )}
    </PaddedContainer>
  );
}

export default ConsignmentNoteNew;
