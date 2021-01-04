import React from 'react';
import { validatePassword, getHelperText } from 'utils';
import BaseField from '../BaseField';

export const PasswordField = ({
  inputRef, defaultValue, error, ...props
}) => (
  <BaseField
    name="password"
    label="Пароль"
    type="password"
    error={!!error}
    autoComplete="current-password"
    helperText={getHelperText(error)}
    inputRef={inputRef({
      required: true,
      minLength: 8,
      maxLength: 15,
      validate: validatePassword,
    })}
    {...props}
  />
);
