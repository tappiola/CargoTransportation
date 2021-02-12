import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  header: {
    position: 'relative',
    overflow: 'hidden',
    paddingTop: 150,
    filter: 'drop-shadow(1px 1px 4px grey)',
  },
  confetti: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 'auto',
    opacity: 0.7,
  },
  gift: {
    position: 'relative',
    left: '35%',
    width: '30%',
    height: 'auto',
    filter: 'drop-shadow(1px 1px 4px grey)',
  },
  main: {
    position: 'relative',
  },
  h1: {
    position: 'absolute',
    top: 50,
    display: 'inline-block',
    fontSize: 20,
    marginLeft: 20,
    fontFamily: 'Arial',
    zIndex: 1,
    width: '100%',
    textAlign: 'center',
  },
  image: {
    display: 'inline-block',
    width: 100,
    height: 100,
  },
  text: {
    zIndex: 2,
    fontFamily: 'sans-serif',
    fontSize: 16,
  },
  footer: {
    fontStyle: 'italic',
    marginTop: 20,
    paddingBottom: 20,
  },
}));
