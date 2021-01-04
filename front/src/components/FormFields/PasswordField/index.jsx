import React from 'react';
import BaseField from '../BaseField';

const PasswordField = (props) => (
  <BaseField
    {...props}
    name="password"
    label="Пароль"
    type="password"
    autoComplete="current-password"
  />
);

export default PasswordField;
