import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import {
  Route, Switch, useRouteMatch, useParams,
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { Link } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PropTypes from 'prop-types';

const columns = [
  {
    field: 'name',
    headerName: 'ФИО',
    disableClickEventBubbling: true,
    flex: 2,
    renderCell: (params) => (
      <Link href={`/users/${params.row.id}`}>{params.value}</Link>
    ),
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 2,
    renderCell: (params) => <Link href={`mailto:${params.value}`} color="textPrimary">{params.value}</Link>,
  },
  {
    field: 'companyName',
    headerName: 'Компания',
    flex: 2,
  },
  {
    field: 'companyUnp',
    headerName: 'УНП',
    flex: 1,
  },
];

// Generate data for rows
function createData(id, name, email, companyName, companyUnp) {
  return {
    id, name, email, companyName, companyUnp,
  };
}

const rows = [
  createData(1, 'Иванов Иван Иванович', 'i.ivanov@gmail.com', 'БелСпецТранспорт', 845785123),
  createData(2, 'Сидоров Петр Валерьевич', 'sidorov@mail.ru', 'ТехСтройСервис', 454751578),
  createData(3, 'Пупкин Василий Васильевич', 'vpupkin@mail.ru', 'ГосТрансАвто', 989898988),
  createData(4, 'Васюков Геннадий Аркадьевич', 'vasiukovvv@gmail.com', 'ТрансАвтоЭкспресс', 789456123),
  createData(5, 'Прохоров Александр Аркадьевич', 'a.prohorov@minsktrans.com', 'Минсктранс', 345876312),
  createData(6, 'Валерьянов Михаил Васильевич', 'valerianov.m@mail.ru', 'Гомельтранс', 145872369),
  createData(7, 'Пронченко Геннадий Аркадьевич', 'pronchenko@auto.com', 'ПронченкоТранс', 225469531),
  createData(8, 'Астапук Геннадий Аркадьевич', 'astapuk@yandex.ru', 'АвтоПромТранс', 785136589),
  createData(9, 'Кабанов Геннадий Аркадьевич', 'kabanov@gmail.com', 'МинскСтройЭкспорт', 753951825),
  createData(10, 'Гаврилюк Геннадий Аркадьевич', 'gavriliuk@mail.ru', 'АвтоГрузТранс', 654128934),
  createData(11, 'Минченко Геннадий Аркадьевич', 'minchenko@gmail.com', 'ИП Минченко', 746328451),
  createData(12, 'Зарубин Антон Викторович', 'zarubin@gmail.com', 'ЧТУП СтройЭкспортТранс', 878788889),
];

// Table toolbar
const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
  button: {
    whiteSpace: 'nowrap',
  },
}));

const TableToolbar = ({ title, selection }) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar
      className={classes.root}
    >
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.title} variant="h5" id="tableTitle" component="div" align="left">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.title} id="tableButtons" component="div" align="right">
            <ButtonGroup variant="contained">
              <Button className={classes.button} color="primary">Новый пользователь</Button>
              <Button color="secondary" disabled={selection.length === 0}>Удалить</Button>
            </ButtonGroup>
          </Typography>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  selection: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function UsersList() {
  const classes = useStyles();
  const [selection, setSelection] = useState([]);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <TableToolbar
        title="Пользователи"
        selection={selection}
      />
      <div style={{ width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          autoHeight
          rowHeight={42}
          checkboxSelection
          rowsPerPageOptions={[10, 20]}
          onSelectionChange={(newSelection) => {
            setSelection(newSelection.rowIds);
          }}
        />
      </div>
    </Container>
  );
}

function User() {
  const { id } = useParams();
  return `user ${id}`;
}

export default function Users() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:id`} component={User} />
      <Route component={UsersList} />
    </Switch>
  );
}
