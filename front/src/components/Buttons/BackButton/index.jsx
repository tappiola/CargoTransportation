import React from 'react';

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import NavButton from '../NavButton';

const Index = ({ link, text }) => (
  <NavButton
    variant="outlined"
    to={link}
    startIcon={(
      <KeyboardBackspaceIcon />
    )}
  >
    {text}
  </NavButton>
);

export default Index;
