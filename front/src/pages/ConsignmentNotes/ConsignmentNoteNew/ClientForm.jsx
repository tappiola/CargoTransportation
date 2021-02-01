import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import ControlledAutocomplete from 'components/ControlledAutocomplete';
import { dispatchGetClients } from 'redux/actions';
import { isEmpty } from 'utils/objectUtils';

const ClientForm = ({ onAddClient }) => {
  const { clientsData } = useSelector(({ clients }) => clients);

  const dispatch = useDispatch();
  useEffect(() => { dispatch(dispatchGetClients()); }, []);

  return (
    <>
      <Grid container spacing={3} justify="space-between" alignItems="center">
        <Grid item xs={12} md={8} lg={9}>
          <ControlledAutocomplete
            name="client"
            fieldName="fullName"
            options={clientsData}
            getOptionLabel={(option) => option.fullName || ''}
            getOptionSelected={
            (option, value) => isEmpty(value) || option.fullName === value.fullName
          }
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
