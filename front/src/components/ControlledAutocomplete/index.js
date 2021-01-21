import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {Controller, useFormContext} from "react-hook-form";
import React from "react";


const ControlledAutocomplete = ({ options = [], label,fieldName, getOptionLabel, getOptionSelected, onChange: ignored, defaultValue, name, renderOption }) => {
  const { control, errors } = useFormContext();
  console.log(errors, control);

  return (
    <Controller
      render={({ onChange, ...props }) => (
        <Autocomplete
          options={options}
          getOptionLabel={getOptionLabel}
          getOptionSelected={getOptionSelected}
          renderOption={renderOption}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              margin="normal"
              error={errors && !!errors[name]}
              helperText={errors[name] && errors[name][fieldName]?.message}
            />
          )}
          onChange={(e, data) => {onChange(data)}}
          {...props}
        />
      )}
      onChange={([, data]) => data}
      defaultValue={defaultValue}
      name={name}
      control={control}

    />
  );
}

export default ControlledAutocomplete;
