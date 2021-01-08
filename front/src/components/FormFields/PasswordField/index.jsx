import BaseField from '../BaseField';
import React from 'react';

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
