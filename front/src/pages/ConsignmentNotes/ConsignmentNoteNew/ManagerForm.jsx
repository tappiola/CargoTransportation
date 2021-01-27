import React from 'react';

import Grid from '@material-ui/core/Grid';

import ControlledAutocomplete from 'components/ControlledAutocomplete';
import { useElastic } from 'utils';

const ClientForm = () => {
  const { options, onChange } = useElastic('managers', 'fullName');
  const getOption = ({ fullName: option }, { fullName: value }) => (!option) || option === value;

  return (
    <Grid container spacing={3} justify="space-between" alignItems="center">
      <Grid item xs={12}>
        <ControlledAutocomplete
          name="manager"
          fieldName="fullName"
          options={options}
          onInputChange={onChange}
          getOptionSelected={getOption}
          getOptionLabel={({ fullName }) => fullName || ''}
          label="ФИО"
          defaultValue={{}}
        />
      </Grid>
    </Grid>
  );
};

export default ClientForm;
