import { makeStyles } from '@material-ui/core/styles';

export const useContainerStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));
