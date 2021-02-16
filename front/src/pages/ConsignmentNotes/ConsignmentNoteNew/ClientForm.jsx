import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import ControlledAutocomplete from 'components/ControlledAutocomplete';
import { ELASTIC_INDICIES } from 'constants/elastic';
import { dispatchGetClients } from 'redux/actions';
import { useElastic } from 'utils';

const ClientForm = ({ onAddClient }) => {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(dispatchGetClients()); }, []);

  const { options, onChange } = useElastic(ELASTIC_INDICIES.CLIENTS, 'fullName');
  const getOption = ({ fullName: option }, { fullName: value }) => (!option) || option === value;

  return (
    <>
      <Grid container spacing={3} justify="space-between" alignItems="center">
        <Grid item xs={12} md={8} lg={9}>
          <ControlledAutocomplete
            name="client"
            fieldName="fullName"
            options={options}
            onInputChange={onChange}
            getOptionLabel={(option) => option.fullName || ''}
            getOptionSelected={getOption}
            label="ФИО"
            defaultValue={{}}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Button
            variant="contained"
            onClick={onAddClient}
          >
            Добавить нового клиента
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ClientForm;
