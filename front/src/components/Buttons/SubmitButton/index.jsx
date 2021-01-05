import React from 'react';

import Button from '@material-ui/core/Button';

const SubmitButton = ({ children, ...props }) => (
  <Button
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
    {...props}
  >
    {children || 'Вход'}
  </Button>
);

export default SubmitButton;
