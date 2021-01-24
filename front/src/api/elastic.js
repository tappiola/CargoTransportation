import { useState, useMemo } from 'react';

export const useElastic = (index, field) => {
  const [options, setOptions] = useState([]);
  const socket = useMemo(() => new WebSocket('ws://localhost:5000/api/elastic'), []);

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
