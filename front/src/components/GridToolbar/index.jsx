import { useToolbarStyles } from './GridToolbar.styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function GridToolbar({ title, children }) {
  const classes = useToolbarStyles();
  return (
    <Toolbar className={classes.root}>
      <Grid container>
        <Grid item xs>
          <Typography className={classes.title} variant="h5" id="tableTitle" component="div" align="left">
            {title}
          </Typography>
        </Grid>
        <Grid item sm>
          <Typography noWrap className={classes.title} id="tableButtons" component="div" align="right">
            <ButtonGroup variant="contained">
              {children}
            </ButtonGroup>
          </Typography>
        </Grid>
      </Grid>
    </Toolbar>
  );
}

export default GridToolbar;
