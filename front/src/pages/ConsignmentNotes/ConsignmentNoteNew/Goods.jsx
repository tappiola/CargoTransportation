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
import Input from "@material-ui/core/Input";
import {useFormContext} from "react-hook-form";


const useStyles = makeStyles((theme) => ({
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
  id: +new Date(),
  name,
  quantity,
  measurement,
  cost,
  remarks,
});

const CustomTableCell = ({row, isEditMode, name, onChange}) => {
  const classes = useStyles();
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          defaultValue={row[name]}
          name={name}
          placeholder={name}
          onChange={e => onChange(e, row)}
          className={classes.input}
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

  return <>
    <TableRow key={row.id} form="my_form">
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
                              onClick={() => {
                                setIsEditMode(false);
                                setCurrentData({});
                              }
                              }
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
                    <CustomTableCell {...{row, isEditMode, name: "measurement", onChange}} />
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
            onDelete(row.id);
          }}
        />
      )}
      </>
}

const Goods = () => {
    const classes = useStyles();
  const [rows, setRows] = React.useState([]);
  const { setValue, register } = useFormContext();

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
    setRows(rows => [...rows, createData('', '', '', '', '')]);
  }

  const onRowChange = (row, newData) => {
    setRows(rows => rows.map(r => r.id === row.id ? {...row, ...newData}: r));
  }

  return <>
    <Table className={classes.table} aria-label="caption table" ref={register}>
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
    </>
}

export default Goods;
