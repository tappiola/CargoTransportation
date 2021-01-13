import React from 'react';

import Button from '@material-ui/core/Button';

const SubmitButton = ({ children, ...props }) => (
  <Button
    {...props}
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
  >
    {children || 'Вход'}
  </Button>
);

export default SubmitButton;
