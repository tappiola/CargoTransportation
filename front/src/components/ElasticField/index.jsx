import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useElastic = (index, field) => {
  const [options, setOptions] = useState([]);
  const socket = new WebSocket('ws://localhost:5000/api/elastic');

  socket.onmessage = ({ data }) => {
    const results = JSON.parse(data).map(({ _source }) => _source);
    setOptions(results);
  };

  return {
    options,
    onChange: ({ target }) => {
      if (socket.readyState === socket.OPEN) {
        socket.send(JSON.stringify({ query: target.value, index, field }));
      }
    },
  };
};

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
