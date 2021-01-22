import React, { useEffect, useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { getOptions } from 'api/elastic';

export default function ElasticField({ index, field }) {
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(async () => {
    const result = await getOptions({ index, query, field });
    setOptions(result.map(({ _source }) => _source));
  }, [query]);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option[field]}
      style={{ width: 300, margin: 50 }}
      renderInput={(params) => (
        <TextField
          {...params}
          value={query}
          onChange={({ target }) => setQuery(target.value)}
          label={field}
        />
      )}
    />
  );
}
