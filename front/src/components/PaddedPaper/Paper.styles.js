import { makeStyles } from '@material-ui/core/styles';

export const usePaperStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    overflow: 'auto',
    marginBottom: theme.spacing(3),
  },
}));
