import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  colorInput: {
    width: 50,
    height: 50,
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      filter: 'brightness(1.1)',
    },
  },
  fullWidth: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    cursor: 'pointer',
    borderRadius: 5,
    '&:hover': {
      filter: 'brightness(0.8)',
    },
  },
  template: {
    position: 'relative',
    display: 'flex',
  },
  iconButton: {
    width: 95,
    height: 95,
  },
  colorBtn: {
    margin: theme.spacing(1),
    height: 40,
    minWidth: 45,
    borderRadius: 0,
    border: '1px solid grey',
    background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
    color: '#fff',
    fontWeight: 'bold',
    '& input': {
      width: 0,
      height: 0,
      visibility: 'hidden',
    },
    '&:hover': {
      filter: 'brightness(1.1)',
    },
  },
}));
