import React from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useElastic } from 'api';

export default function ElasticField({ index, field }) {
  const { options, onChange } = useElastic(index, field);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option[field]}
      style={{ width: 300, margin: 50 }}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={onChange}
          label={field}
        />
      )}
    />
  );
}
