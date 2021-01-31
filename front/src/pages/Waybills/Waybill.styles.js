import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  footer: {
    margin: theme.spacing(2, 2, 1),
    display: 'flex',
    alignItems: 'end',
  },
  pointsGrid: (rowsNumber) => ({
    height: rowsNumber * 42 + 110,
  }),
  point: {
    '&:before': {
      border: 'hidden',
    },
  },
  date: {
    '& input[type="datetime-local"]::-webkit-calendar-picker-indicator': {
      opacity: 0,
      '&:hover': {
        cursor: 'pointer',
      },
    },
    background: 'url("/date-picker.svg")',
    backgroundSize: 18,
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: 'right',
    backgroundPositionY: 'top',
  },
}));
