import { makeStyles } from '@material-ui/core';

const rowHeigth = 42;
const thumbHeigth = 82;
const controlsHeigth = 139;

export const useStyles = makeStyles((theme) => ({
  footer: {
    margin: theme.spacing(2, 2, 1),
    display: 'flex',
    justifyContent: 'space-between',
  },
  pointsGrid: (rowsNumber) => ({
    height: (rowsNumber * rowHeigth || thumbHeigth) + controlsHeigth,
    position: 'relative',
    paddingTop: 24,
    top: -theme.spacing(2),
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
