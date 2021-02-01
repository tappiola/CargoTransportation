import { useState } from 'react';

import { getOptions } from 'api';
import { throttle } from 'utils';

export const useElastic = (index, field) => {
  const [options, setOptions] = useState([]);

  const updateOptions = async ({ target }) => {
    if (target.value) {
      const results = await getOptions({ index, field, query: target.value });
      setOptions(results.map(({ _source }) => _source));
    }
  };

  return {
    options,
    onChange: throttle(updateOptions, 200),
  };
};
