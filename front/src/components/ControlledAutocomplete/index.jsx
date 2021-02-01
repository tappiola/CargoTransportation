import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const ControlledAutocomplete = ({
  options = [], label, fieldName, getOptionLabel, getOptionSelected,
  defaultValue, name, renderOption, onSelectionChange, disabled, onInputChange,
}) => {
  const { control, errors } = useFormContext();

  return (
    <Controller
      render={({ onChange, ...props }) => (
        <Autocomplete
          options={options}
          getOptionLabel={getOptionLabel}
          getOptionSelected={getOptionSelected}
          renderOption={renderOption}
          disabled={disabled}
          onInputChange={onInputChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              margin="normal"
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
