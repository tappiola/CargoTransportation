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
import React, {useState} from "react";
import {ConfirmDialog} from "@tappiola/material-ui-externals";
import makeStyles from "@material-ui/styles/makeStyles";
import Input from "@material-ui/core/Input";

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

const Goods = () => {
  const classes = useStyles();
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

  return <>
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
    {isConfirmDialogOpen && (
        <ConfirmDialog
          title="Удаление товарной позиции"
          description="Вы уверены, что хотите удалить выбранный товар"
          onPopupClose={() => setIsConfirmDialogOpen(false)}
          onActionConfirm={() => {
            setIsConfirmDialogOpen(false);
            onDelete(selectedRowId);
            setSelectedRowId(null);
          }}
        />
      )}
    </>
}

export default Goods;
