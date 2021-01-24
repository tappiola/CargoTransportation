/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';

import { List, ListItem, TextField } from '@material-ui/core';

import { useElastic } from 'api';

const intersection = (first, ...other) =>
  first.filter(({ id }) =>
    other.every((results) =>
      results.some(({ id: someId }) => id === someId)));

function Client() {
  const { options: fromFirstName, onChange: onFirstNameChange } = useElastic('users', 'firstName');
  const { options: fromLastName, onChange: onLastNameChange } = useElastic('users', 'lastName');
  const [results, setResults] = useState([]);
  const fieldsDataArr = [fromLastName, fromFirstName];

  useEffect(() => {
    const [first, ...other] = fieldsDataArr.filter((i) => i);
    setResults(other.length ? intersection(first, ...other) : first);
  }, [...fieldsDataArr]);

  return (
    <>
      <TextField onChange={onFirstNameChange} label="имя" />
      <TextField onChange={onLastNameChange} label="фамилия" />
      <List>
        {results
          ? results.map(({ firstName, lastName, id }) => (
            <ListItem key={id}>
              <p>
                {firstName}
                &nbsp;
                {lastName}
              </p>
            </ListItem>
          ))
          : 'Не найдено'}
      </List>
    </>
  );
}

export default Client;
