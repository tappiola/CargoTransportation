import React from 'react';

import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useElastic } from 'api';

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    minWidth: 200,
    height: 50,
    left: -1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

const ElasticField = ({
  index, field, inputProps, ...props
}) => {
  const { options, onChange } = useElastic(index, field);
  const classes = useStyles();
  return (
    <Autocomplete
      options={options}
      classes={{ inputRoot: classes.root }}
      getOptionLabel={(option) => option[field]}
      renderInput={(params) => (
        <TextField
          {...params}
          {...inputProps}
          style={{ borderLeftWidth: 0 }}
          onChange={onChange}
          variant="outlined"
        />
      )}
      {...props}
    />
  );
};

export default ElasticField;
