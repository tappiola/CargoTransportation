import React from 'react';
import BaseField from '../BaseField';

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
