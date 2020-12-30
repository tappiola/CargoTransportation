import React from 'react';
import Button from '@material-ui/core/Button';

const DeleteButton = ({ isDisabled, onButtonClick, ...props }) => (
  <Button
    color="secondary"
    disabled={isDisabled}
    onClick={onButtonClick}
    {...props}
  >
    Удалить
  </Button>
);

export default DeleteButton;
