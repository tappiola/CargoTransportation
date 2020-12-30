import React from 'react';
import BaseField from './BaseField';

const PasswordField = (props) => (
  <BaseField
    name="password"
    label="Пароль"
    type="password"
    autoComplete="current-password"
    {...props}
  />
);

export default PasswordField;
