import { useState, useMemo } from 'react';

export const useElastic = (index, field) => {
  const [options, setOptions] = useState([]);
  const socket = useMemo(() => new WebSocket('ws://localhost:5000/api/elastic'), []);

  socket.onmessage = ({ data }) => {
    try {
      const results = JSON.parse(data).map(({ _source }) => _source);
      setOptions(results);
    } catch {
      setOptions([]);
    }
  };

  return {
    options,
    onChange: ({ target }) => {
      if (!target.value) {
        return setOptions([]);
      }
      if (socket.readyState === socket.OPEN) {
        return socket.send(JSON.stringify({ query: target.value, index, field }));
      }
      return null;
    },
  };
};
