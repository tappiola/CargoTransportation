import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import React from 'react';
import { useButtonStyles } from '../Buttons.styles';

const NavButton = ({ children, to, ...props }) => {
  const classes = useButtonStyles();
  return (
    <Button
      className={classes.button}
      color="primary"
      component={NavLink}
      to={to}
      {...props}
    >
      {children}
    </Button>
  );
};

export default NavButton;
