import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import React from 'react';

const NavButton = ({ children, to, ...props }) => (
  <Button
    {...props}
    color="primary"
    component={NavLink}
    to={to}
  >
    {children}
  </Button>
);

export default NavButton;
