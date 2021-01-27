import React from 'react';
import { NavLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';

const NavButton = ({ children, to, ...props }) => (
  <Button
    component={NavLink}
    to={to}
    {...props}
  >
    {children}
  </Button>
);

export default NavButton;
