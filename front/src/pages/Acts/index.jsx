import React, { useEffect, useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { getResults } from 'api/elastic';

export default function Acts() {
  const [result, setResults] = useState([]);
  const [value, setValue] = useState('');

  useEffect(async () => {
    const r = await getResults(value);
    const b = r.map(({ _source }) => _source);
    setResults(b);
  }, [value]);

  return (
    <Autocomplete
      id="combo-box-demo"
      options={result}
      getOptionLabel={(option) => option?.firstName + option.companyName}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          value={value}
          onChange={({ target }) => setValue(target.value)}
          label="Combo box"
          variant="outlined"
        />
      )}
    />
  );
}
