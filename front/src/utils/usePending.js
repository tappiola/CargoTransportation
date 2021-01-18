import { useState } from 'react';

export const usePending = (fn, { errorText } = { errorText: 'Ошибка' }) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handler = (...args) => {
    setPending(true);
    fn(...args)
      .catch(() => setError(errorText))
      .finally(() => setPending(false));
  };

  return {
    bindPending: { pending, error },
    handler,
  };
};
