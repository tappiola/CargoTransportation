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

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
      },
    },
  };
};

export const usePending = (fn, { errorText } = { errorText: 'Ошибка' }) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handler = (...args) => {
    setPending(true);
    fn(...args)
      .then(() => setError(false))
      .catch((e) => setError(e || errorText))
      .finally(() => setPending(false));
  };

  return {
    bindPending: { pending, error },
    handler,
  };
};
