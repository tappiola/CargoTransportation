import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { usePaperStyles } from './Paper.styles';

const Title = ({ children }) => (
  <Typography component="h2" variant="h6" color="primary" gutterBottom>
    {children}
  </Typography>
);

export default function PaddedPaper({ title, children, ...props }) {
  const classes = usePaperStyles();
  return (
    <Paper className={classes.paper} {...props}>
      <Title>{title}</Title>
      {children}
    </Paper>
  );
}
