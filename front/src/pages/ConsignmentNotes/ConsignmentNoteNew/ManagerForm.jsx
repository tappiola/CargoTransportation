import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';

import * as api from 'api';
import ControlledAutocomplete from 'components/ControlledAutocomplete';
import { ROLES } from 'constants/permissions';
import { isEmpty } from 'utils/objectUtils';

const ClientForm = () => {
  const [managersData, setManagersData] = useState([]);

  useEffect(() => {
    api.getEmployeesWithRole(ROLES.MANAGER)
      .then((data) => {
        setManagersData(data);
      });
  }, []);

  return (
    <Grid container spacing={3} justify="space-between" alignItems="center">
      <Grid item xs={12}>
        <ControlledAutocomplete
          name="manager"
          fieldName="fullName"
          options={managersData}
          getOptionLabel={(option) => option.fullName || ''}
          getOptionSelected={
            (option, value) => isEmpty(value) || option.fullName === value.fullName
          }
          label="ФИО"
          defaultValue={{}}
        />
      </Grid>
    </Grid>
  );
};

export default ClientForm;
