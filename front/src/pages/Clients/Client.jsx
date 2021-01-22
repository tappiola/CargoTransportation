import React from 'react';

import ElasticField from 'components/ElasticField';

function Client() {
  return (
    <ElasticField index="users" field="firstName" />
  );
}

export default Client;
