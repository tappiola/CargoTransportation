import Button from "@material-ui/core/Button";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import Table from "@material-ui/core/Table";
import React, {useState, useEffect} from "react";
import {ConfirmDialog} from "@tappiola/material-ui-externals";
import makeStyles from "@material-ui/styles/makeStyles";
import {useFormContext} from "react-hook-form";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import BaseField from 'components/ControlledField';


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  formControl: {
    width: '100%',
  },
  table: {
    width: '100%',
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

const createData = (name, quantity, unit, cost, remarks) => ({
  id: +new Date(),
  name,
  quantity,
  unit,
  cost,
  remarks,
});

const CustomTableCell = ({row, isEditMode, name, onChange}) => {
  const {register} = useFormContext();
  const classes = useStyles();
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <BaseField
          defaultValue={row[name]}
          name={name}
          placeholder={name}
          onInput={e => onChange(e, row)}
          className={classes.input}
          inputRef={register}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

const CustomTableRow = ({row, onDelete, onRowChange}) => {
  const classes = useStyles();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [currentData, setCurrentData] = useState({});

  const onChange = (e) => {
    const newData = {[e.target.name]: e.target.value};
    setCurrentData(currentData => ({...currentData, ...newData}));
  };

  const onCancel = ({id, ...data}) => {
    if (Object.values(data).some(v => v !== '')) {
      setIsEditMode(false);
      setCurrentData({});
    } else {
      onDelete();
    }
  }

  return <>
    <TableRow key={row.id}>
                    <TableCell className={classes.selectTableCell}>
                      {isEditMode ? (
                        <>
                          <Tooltip title="Сохранить">
                            <IconButton
                              aria-label="done"
                              onClick={() => {
                                onRowChange(currentData);
                                setIsEditMode(false);
                              }}
                            >
                              <DoneIcon/>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Отменить">
                            <IconButton
                              aria-label="revert"
                              onClick={() => onCancel(row)}
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
                              onClick={() => {
                                setIsEditMode(true);
                              }}
                            >
                              <EditIcon/>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Удалить">
                            <IconButton
                              aria-label="delete"
                              onClick={() => setIsConfirmDialogOpen(true)}
                            >
                              <DeleteForeverOutlinedIcon/>
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                    </TableCell>
                    <CustomTableCell {...{row, isEditMode, name: "name", onChange}} />
                    <CustomTableCell {...{row, isEditMode, name: "quantity", onChange}} />
                    <CustomTableCell {...{row, isEditMode, name: "unit", onChange}} />
                    <CustomTableCell {...{row, isEditMode, name: "cost", onChange}} />
                    <CustomTableCell {...{row, isEditMode, name: "remarks", onChange}} />
                  </TableRow>
        {isConfirmDialogOpen && (
        <ConfirmDialog
          title="Удаление товарной позиции"
          description="Вы уверены, что хотите удалить выбранный товар"
          onPopupClose={() => setIsConfirmDialogOpen(false)}
          onActionConfirm={() => {
            setIsConfirmDialogOpen(false);
            onDelete();
          }}
        />
      )}
      </>
}

const Goods = () => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const { setValue, register, errors, clearErrors } = useFormContext();

  useEffect(() => {
    register({ name: "goods" });
  }, [register]);

  useEffect(() => {
    setValue("goods", rows);
  },[rows]);

  const onDelete = (rowId) => {
    setRows(rows => [...rows.filter(r => r.id !== rowId)]);
  }

  const onRowAdd = () => {
    clearErrors();
    setRows(rows => [...rows, createData('', '', '', '', '')]);
  }

  const onRowChange = (row, newData) => {
    setRows(rows => rows.map(r => r.id === row.id ? {...row, ...newData}: r));
  }

  return <FormControl error={!!errors?.goods}>
    <Table className={classes.table} ref={register}>
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
                {rows.map(row => <CustomTableRow
                  key={row.id}
                  row={row}
                  onDelete={() => onDelete(row.id)}
                  onRowChange={newData => onRowChange(row, newData)}
                />)}
              </TableBody>
            </Table>
    <FormHelperText>{errors.goods?.message}</FormHelperText>
                {errors.goods?.constructor === Array
                && Array.from(new Set(errors.goods
                  .map(e => Object.values(e))
                  .reduce((prev, next)=> [...prev, ...next], [])
                  .map(i=> i.message)))
                  .map(message => <FormHelperText>{message}</FormHelperText>)
                }
            </FormControl>
}

export default Goods;
