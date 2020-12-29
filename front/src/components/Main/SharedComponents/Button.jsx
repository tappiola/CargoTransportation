import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import React from 'react';
import { useButtonStyles } from './Shared.styles';

export const NavButton = ({ children, to, ...props }) => {
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

export const DeleteButton = ({ isDisabled, onButtonClick, ...props }) => (
  <Button
    color="secondary"
    disabled={isDisabled}
    onClick={onButtonClick}
    {...props}
  >
    Удалить
  </Button>
);
