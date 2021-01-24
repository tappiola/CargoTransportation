import React from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useElastic } from 'api';

const ElasticField = ({
  index, field, inputProps, ...props
}) => {
  const { options, onChange } = useElastic(index, field);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option[field]}
      renderInput={(params) => (
        <TextField {...params} {...inputProps} onChange={onChange} />
      )}
      {...props}
    />
  );
};

export default ElasticField;
