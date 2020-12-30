import React from 'react';

import Button from '@material-ui/core/Button';

const SubmitButton = (props) => (
  <Button
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
    {...props}
  >
    Вход
  </Button>
);

export default SubmitButton;
