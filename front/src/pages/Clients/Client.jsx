import React from 'react';

import ElasticField from 'components/ElasticField';

function Client() {
  return (
    <ElasticField index="clients" field="firstName" />
  );
}

export default Client;
