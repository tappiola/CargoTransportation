import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useToolbarStyles } from './GridToolbar.styles';

export function GridToolbar({ title, children }) {
  const classes = useToolbarStyles();
  return (
    <Toolbar className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.title} variant="h5" id="tableTitle" component="div" align="left">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.title} id="tableButtons" component="div" align="right">
            <ButtonGroup variant="contained">
              {children}
            </ButtonGroup>
          </Typography>
        </Grid>
      </Grid>
    </Toolbar>
  );
}
