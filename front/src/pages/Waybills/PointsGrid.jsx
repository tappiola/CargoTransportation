import React, { useState } from 'react';

import { Button, IconButton } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import { format } from 'date-fns';

import { useStyles } from './Waybill.styles';
import BaseField, { DateTimeField } from 'components/ControlledField';
import CustomGrid from 'components/DataGrid';
import { DATE_TIME } from 'constants/dateFormats';

const controlPoints = [
  { id: 0, point: 'Смоленск', date: '2020-01-30T09:00' },
  { id: 1, point: 'Воронеж', date: '2020-01-30T21:00' },
  { id: 2, point: 'Магнитогорск', date: '2020-01-31T07:00' },
];

export const PointsGrid = () => {
  const [points, setPoints] = useState(controlPoints);
  const classes = useStyles(points.length);

  const addEmptyPoint = () => {
    const emptyPoint = { id: points[points.length - 1].id + 1, point: '', date: format(Date.now(), DATE_TIME) };
    setPoints([...points, emptyPoint]);
  };

  const GridFooter = () => (
    <Grid className={classes.footer}>
      <Button onClick={addEmptyPoint} size="small" variant="outlined" color="primary" disabled={points.length >= 9}>
        Добавить
      </Button>
    </Grid>
  );

  const deletePoint = (id) => setPoints(
    (prevPoints) => prevPoints.filter(({ id: _id }) => _id !== id),
  );
  const columns = [
    {
      field: 'point',
      headerName: 'Пункт назначения',
      flex: 1,
      renderCell: ({ value, row }) => (
        <>
          <IconButton size="small" onClick={() => deletePoint(row.id)} edge="end" style={{ marginRight: 16 }}>
            <DeleteIcon fontSize="small" color="secondary" />
          </IconButton>
          <BaseField
            size="small"
            defaultValue={value}
            name={`points.${row.id}.name`}
            InputProps={{
              classes: { underline: classes.point },
            }}
          />
        </>
      ),
    },
    {
      field: 'date',
      headerName: 'Время прохождения',
      width: 220,
      renderCell: ({ row }) => (
        <DateTimeField
          className={classes.date}
          name={`points.${row.id}.date`}
          defaultValue={row.date}
          InputProps={{
            classes: { underline: classes.point },
            disableUnderline: true,
          }}
        />
      ),
    },
  ];
  return (
    <Grid className={classes.pointsGrid}>
      <CustomGrid
        rows={points}
        columns={columns}
        checkboxSelection={false}
        hideFooter
        disableColumnFilter
        components={{
          footer: GridFooter,
        }}
      />
    </Grid>
  );
};
