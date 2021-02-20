import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const ControlledAutocomplete = ({
  name, label, fieldName, defaultValue, onSelectionChange, ...otherProps
}) => {
  const { control, errors } = useFormContext();

  return (
    <Controller
      render={({ onChange, ...props }) => (
        <Autocomplete
          options={[]}
          {...otherProps}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              label={label}
              error={errors && !!errors[name]}
              helperText={errors[name] && errors[name][fieldName]?.message}
            />
          )}
          onChange={(e, data) => {
            if (onSelectionChange) {
              onSelectionChange(data);
            }
            onChange(data);
          }}
          {...props}
        />
      )}
      onChange={([, data]) => data}
      defaultValue={defaultValue}
      name={name}
      control={control}
    />
  );
};

export default ControlledAutocomplete;
