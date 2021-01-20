import React, {useState} from 'react';

import Grid from '@material-ui/core/Grid';

import BaseField from '../../components/ControlledField';
import {FormProvider, useForm} from "react-hook-form";
import {employeeResolver as resolver} from "../Employees/employeeResolver";
import Select from '@material-ui/core/Select'
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import PaddedContainer from "../../components/PaddedContainer";
import makeStyles from "@material-ui/styles/makeStyles";
import {useSelector} from "react-redux";
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
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import Input from "@material-ui/core/Input";


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

const createData = (name, quantity, measurement, cost, remarks) => ({
  id: name.replace(" ", "_"),
  name,
quantity, measurement, cost, remarks,
  isEditMode: false
});

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
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
  const [client, setClient] = useState();
  const methods = useForm({resolver});
  const {register, handleSubmit, errors} = methods;

  const handleChange = (event) => {
    setClient(event.target.value);
  };

  const classes = useStyles();

  // table
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
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value };
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
      <GridToolbar title="Добавление ТТН" />
      <FormProvider {...methods}>
        <form
          noValidate
          onSubmit={() => console.log('submit')}
        >

          <Paper className={classes.paper}>
            <Title>Шаг 1 - выберите клиента</Title>
          <Grid container spacing={3} justify="space-between" alignItems="center">
          <Grid item xs={12} md={8} lg={9}>
            <FormControl className={classes.formControl}>
              <Select value={client} onChange={handleChange} className={classes.selectEmpty}>
                {clientsData.map(c => <MenuItem
                  value={c.id}>{c.fullName + (c.companyName ? ` (${c.companyName})` : '')}</MenuItem>)}
              </Select>
              <FormHelperText>Клиент</FormHelperText>
            </FormControl>
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
              InputLabelProps={{ shrink: true }}
            />
         </Grid>
         </Grid>
          </Paper>


          <Paper className={classes.paper}>
            <Title>Шаг 3 - введите данные водителя</Title>
            <Grid container spacing={3} justify="space-between" alignItems="center">
              <Grid item xs={12} md={4}>
              <BaseField name="lastName" label="Фамилия" />
              </Grid>
              <Grid item xs={12} md={4}>
            <BaseField name="firstName" label="Имя" />
              </Grid>
              <Grid item xs={12} md={4}>
            <BaseField name="middleName" label="Отчество" />
              </Grid>
            <Grid item xs={12} md={6}>
            <BaseField name="passportNumber" label="Номер паспорта"/>
            </Grid>
<Grid item md={6}>
            <BaseField
              name="issuedDate"
              label="Дата выдачи паспорта"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
         </Grid>
         </Grid>
          </Paper>


          <Paper className={classes.paper}>
            <Title>Шаг 4 - введите данные о грузе</Title>
<Table className={classes.table} aria-label="caption table">
        <caption>A barbone structure table example with a caption</caption>
        <TableHead>
          <TableRow>
            <TableCell align="left" />
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
                    <IconButton
                      aria-label="done"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="revert"
                      onClick={() => onRevert(row.id)}
                    >
                      <RevertIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    aria-label="delete"
                    onClick={() => onToggleEditMode(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              <CustomTableCell {...{ row, name: "name", onChange }} />
              <CustomTableCell {...{ row, name: "quantity", onChange }} />
              <CustomTableCell {...{ row, name: "measurement", onChange }} />
              <CustomTableCell {...{ row, name: "cost", onChange }} />
              <CustomTableCell {...{ row, name: "remarks", onChange }} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
          </Paper>
        </form>
      </FormProvider>
    </PaddedContainer>
  );
}

export default ConsignmentNoteNew;
