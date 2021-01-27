import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { CloseIcon } from '@material-ui/data-grid';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  closeButton: {
    position: 'absolute',
    right: '0',
    top: '0',
  },
}));

export default function FormDialog({
  children, title, isOpen, onClose,
}) {
  const classes = useStyles();
  return (
    <Dialog open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <IconButton onClick={onClose} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}
