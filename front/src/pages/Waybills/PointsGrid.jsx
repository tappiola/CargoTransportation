import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Button, IconButton, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import { format, parseISO } from 'date-fns';

import { useStyles } from './Waybill.styles';
import { getWaybill } from 'api';
import BaseField, { DateTimeField } from 'components/ControlledField';
import CustomGrid from 'components/DataGrid';
import { DATE_TIME } from 'constants/dateFormats';

const formatDate = (dirtyDate) => {
  try {
    return (typeof dirtyDate === 'string')
      ? format(parseISO(dirtyDate), DATE_TIME)
      : format(dirtyDate, DATE_TIME);
  } catch {
    return dirtyDate;
  }
};

export const PointsGrid = ({ errors }) => {
  const { id } = useParams();
  const [points, setPoints] = useState([]);
  const classes = useStyles(points.length);

  useEffect(async () => {
    const { controlPoints: cps } = await getWaybill(id);
    setPoints(cps.map(({ expectedArrivalAt, ...other }) => ({
      expectedArrivalAt: formatDate(expectedArrivalAt),
      ...other,
    })));
  }, []);

  const addEmptyPoint = () => {
    const pointId = points.length ? points[points.length - 1].id + 1 : 0;
    const emptyPoint = { id: pointId, point: '', date: format(Date.now(), DATE_TIME) };
    setPoints([...points, emptyPoint]);
  };

  const GridFooter = () => (
    <Grid className={classes.footer}>
      <Button onClick={addEmptyPoint} size="small" variant="outlined" color="primary" disabled={points.length >= 9}>
        Добавить
      </Button>
      {errors && (
      <Typography color="error" variant="caption">
        Заполните поле
      </Typography>
      )}
    </Grid>
  );

  const deletePoint = (pointId) => setPoints(
    (prevPoints) => prevPoints.filter(({ id: _id }) => _id !== pointId),
  );

  const columns = [
    {
      field: 'name',
      headerName: 'Пункт назначения',
      flex: 1,
      renderCell: ({ value, row }) => (
        <>
          <IconButton size="small" onClick={() => deletePoint(row.id)} edge="end" style={{ marginRight: 16 }}>
            <DeleteIcon fontSize="small" color={errors ? 'secondary' : 'primary'} />
          </IconButton>
          <BaseField
            size="small"
            error={errors && errors[row.id]?.name?.message}
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
      field: 'expectedArrivalAt',
      headerName: 'Время прохождения',
      width: 220,
      renderCell: ({ value, row }) => (
        <DateTimeField
          error={errors && errors[row.id]?.expectedArrivalAt?.message}
          className={classes.date}
          name={`points.${row.id}.expectedArrivalAt`}
          defaultValue={value}
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
