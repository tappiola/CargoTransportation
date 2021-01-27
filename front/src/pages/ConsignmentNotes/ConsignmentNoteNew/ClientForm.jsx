import React from 'react';

import Grid from '@material-ui/core/Grid';

import NavButton from 'components/Buttons/NavButton';
import ControlledAutocomplete from 'components/ControlledAutocomplete';
import { useElastic } from 'utils';

const ClientForm = () => {
  const { options, onChange } = useElastic('clients', 'fullName');
  const getOption = ({ fullName: option }, { fullName: value }) => (!option) || option === value;

  return (
    <Grid container spacing={3} justify="space-between" alignItems="center">
      <Grid item xs={12} md={8} lg={9}>
        <ControlledAutocomplete
          name="client"
          fieldName="fullName"
          options={options}
          onInputChange={onChange}
          getOptionLabel={({ fullName }) => fullName || ''}
          getOptionSelected={getOption}
          label="ФИО"
          defaultValue={{}}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <NavButton variant="contained" to="/clients/new">Добавить нового клиента</NavButton>
      </Grid>
    </Grid>
  );
};

export default ClientForm;
