import { makeStyles } from '@material-ui/core/styles';

export const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
  button: {
    whiteSpace: 'nowrap',
  },
}));

export const useButtonStyles = makeStyles(() => ({
  button: {
    whiteSpace: 'nowrap',
  },
}));

export const useContainerStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));
