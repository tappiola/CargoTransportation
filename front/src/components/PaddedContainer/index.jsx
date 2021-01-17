import React from 'react';

import Container from '@material-ui/core/Container';

import { useContainerStyles } from './Container.styles';

export default function PaddedContainer({ children }) {
  const classes = useContainerStyles();
  return <Container maxWidth="lg" className={classes.container}>{children}</Container>;
}
