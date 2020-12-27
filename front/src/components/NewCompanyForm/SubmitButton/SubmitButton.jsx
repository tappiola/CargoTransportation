import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export const SubmitButton = (props) => (
  <Grid item xs={12}>
    <Button
      type="submit"
      variant="contained"
      color="primary"
      {...props}
      fullWidth
    >
      Готово
    </Button>
  </Grid>
);
