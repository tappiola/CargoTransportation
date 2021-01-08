import Button from '@material-ui/core/Button';
import React from 'react';

const DeleteButton = ({ isDisabled, onButtonClick, ...props }) => (
  <Button
    {...props}
    color="secondary"
    disabled={isDisabled}
    onClick={onButtonClick}
  >
    Удалить
  </Button>
);

export default DeleteButton;
