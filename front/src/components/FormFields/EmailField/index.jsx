import BaseField from '../BaseField';
import React from 'react';

const EmailField = (props) => (
  <BaseField
    {...props}
    label="Email"
    name="email"
    autoComplete="email"
    autoFocus
  />
);

export default EmailField;
