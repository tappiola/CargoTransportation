import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import DatePicker from 'react-date-picker';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  label: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  wrapper: {
    border: 'hidden',
    '& > div': {
      padding: theme.spacing(0, 0, 0.5),
      border: 'none',
      borderBottomColor: theme.palette.text.secondary,
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
    },
    '& svg': {
      display: 'none',
      stroke: theme.palette.text.secondary,
    },
    '& *:focus': {
      outlineWidth: 0,
    },
    '& input': {
      ...theme.typography.subtitle1,
      minWidth: 30,
      textAlign: 'center',
      letterSpacing: 'initial',
      color: theme.palette.text.secondary,
    },
    '& span[class$="leadingZero"]': {
      // zero before date < 10
      display: 'none',
    },
  },
}));

export const BirthdayField = ({ bindBirthDate }) => {
  const [birthDate, setBirthDate] = useState(new Date());
  const classes = useStyle();
  const handleDateChange = (date) => {
    setBirthDate(date);
    bindBirthDate(date);
  };

  return (
    <Grid item container alignItems="center" className={classes.root}>
      <Typography variant="subtitle1" className={classes.label}>
        Дата рождения:
      </Typography>
      <DatePicker
        className={classes.wrapper}
        timeClassName={classes.date}
        margin="normal"
        name="bday"
        id="date-picker-dialog"
        label="Дата рождения"
        format="dd/MM/yyyy"
        value={birthDate}
        autoComplete="bday"
        onChange={handleDateChange}
      />
    </Grid>
  );
};

BirthdayField.propTypes = {
  bindBirthDate: PropTypes.func.isRequired,
};
