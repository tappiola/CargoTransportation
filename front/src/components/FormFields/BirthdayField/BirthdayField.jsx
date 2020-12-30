import React from 'react';

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
  wrapper: (error) => ({
    border: 'hidden',
    '& > div': {
      padding: theme.spacing(0, 0, 0.5),
      border: 'none',
      borderBottomColor: error
        ? theme.palette.error.main
        : theme.palette.text.secondary,
      borderBottomWidth: error ? 2 : 1,
      borderBottomStyle: 'solid',
    },
    '& > div:focus': {
      borderBottomWidth: 2,
      borderBottomColor: error ? 'red' : theme.palette.primary.main,
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
      color: error ? theme.palette.error.main : theme.palette.text.secondary,
    },
    '& span[class$="leadingZero"]': {
      // zero before date < 10
      display: 'none',
    },
  }),
}));

export const BirthdayField = ({ inputRef }) => {
  const classes = useStyle(false);

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
        ref={inputRef}
        autoComplete="bday"
      />
    </Grid>
  );
};
