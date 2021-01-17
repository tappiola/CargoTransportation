import React from 'react';

import Button from '@material-ui/core/Button';

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
