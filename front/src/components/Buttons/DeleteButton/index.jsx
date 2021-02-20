import React from 'react';

import Button from '@material-ui/core/Button';

const DeleteButton = ({ children, ...props }) => (
  <Button {...props} color="secondary">
    {children || 'Удалить'}
  </Button>
);

export default DeleteButton;
