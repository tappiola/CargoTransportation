import React from 'react';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';

const StyledSpinner = <CircularProgress size={24} color="inherit" />;
const SubmitButton = ({
  children = 'Вход', pending, error, ...props
}) => (
  <>
    <Button
      {...props}
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
    >
      {pending ? StyledSpinner : children}
    </Button>
    <FormHelperText error={error}>
      {error || ' '}
    </FormHelperText>
  </>
);

export default SubmitButton;
