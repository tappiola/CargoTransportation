import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IconButton, Typography, Grid } from '@material-ui/core';
import { AddCircle, Delete } from '@material-ui/icons';
import { format, parseISO } from 'date-fns';

import { useStyles } from './Waybill.styles';
import { getWaybill } from 'api';
import BaseField, { DateTimeField } from 'components/ControlledField';
import CustomGrid from 'components/DataGrid';
import { DATE_TIME } from 'constants/dateFormats';

const formatDate = (dirtyDate, ...params) => {
  try {
    return (typeof dirtyDate === 'string')
      ? format(parseISO(dirtyDate), ...params)
      : format(dirtyDate, ...params);
  } catch {
    return dirtyDate;
  }
};

export const PointsGrid = ({ errors }) => {
  const { id: waybillId } = useParams();
  const [points, setPoints] = useState([]);
  const classes = useStyles(points.length);

  useEffect(async () => {
    const { controlPoints } = await getWaybill(waybillId);
    setPoints(controlPoints.map(({ expectedArrivalAt: date, ...other }, id) => ({
      expectedArrivalAt: formatDate(date, DATE_TIME),
      ...other,
      id,
    })));
  }, []);

  const addPoint = (id) => {
    setPoints([...points, { id, point: '', date: '' }]);
  };

  const deletePoint = (id) => {
    setPoints((prevPoints) => prevPoints.filter(({ id: _id }) => _id !== id));
  };

  const GridFooter = () => (
    <Grid className={classes.footer}>
      <IconButton onClick={() => addPoint(points.length)} disabled={points.length >= 9}>
        <AddCircle fontSize="large" color="secondary" />
      </IconButton>
      {errors && (
      <Typography color="error" variant="caption">
        Заполните поля &#34;Пункт назначения&#34; и &#34;Время прохождения&#34;
      </Typography>
      )}
    </Grid>
  );

  const ArrivalCell = ({ value, rowIndex }) => (
    <DateTimeField
      error={errors && errors[rowIndex]?.expectedArrivalAt?.message}
      className={classes.date}
      name={`points.${rowIndex}.expectedArrivalAt`}
      defaultValue={value}
      InputProps={{
        classes: { underline: classes.point },
        disableUnderline: true,
      }}
    />
  );

  const PointCell = ({ value, rowIndex }) => (
    <>
      <IconButton size="small" onClick={() => deletePoint(rowIndex)} style={{ marginRight: 16 }}>
        <Delete fontSize="small" />
      </IconButton>
      <BaseField
        size="small"
        defaultValue={value}
        name={`points.${rowIndex}.name`}
        error={errors && errors[rowIndex]?.name?.message}
        InputProps={{ classes: { underline: classes.point } }}
      />
    </>
  );

  return (
    <Grid className={classes.pointsGrid}>
      <CustomGrid
        rows={points}
        columns={[
          {
            field: 'name',
            headerName: 'Пункт назначения',
            flex: 1,
            renderCell: PointCell,
          },
          {
            field: 'expectedArrivalAt',
            headerName: 'Время прохождения',
            width: 220,
            renderCell: ArrivalCell,
          },
        ]}
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
