import React from 'react';
import BaseField from '../BaseField';

const EmailField = (props) => (
  <BaseField
    label="Email"
    name="email"
    autoComplete="email"
    autoFocus
    {...props}
  />
);

export default EmailField;
