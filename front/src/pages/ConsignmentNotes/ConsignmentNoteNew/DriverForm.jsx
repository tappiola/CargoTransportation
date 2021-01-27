import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Grid from '@material-ui/core/Grid';

import * as api from 'api';
import { useElastic } from 'api';
import ControlledAutocomplete from 'components/ControlledAutocomplete';
import BaseField from 'components/ControlledField';

const DriverForm = () => {
  const [driverId, setDriverId] = useState();
  const [passportData, setPassportData] = useState({});

  const { setValue } = useFormContext();
  const { options, onChange } = useElastic('drivers', 'fullName');

  const getOption = ({ fullName: option }, { fullName: value }) => (!option) || option === value;

  useEffect(() => {
    if (driverId) {
      api.getDocuments(driverId).then((data) => {
        setPassportData(data);
        setValue('passportNumber', data.passportNumber, { shouldValidate: true });
        setValue('passportIssuedBy', data.passportIssuedBy, { shouldValidate: true });
        setValue('passportIssuedAt', data.passportIssuedAt, { shouldValidate: true });
      });
    } else {
      setPassportData({});
      setValue('passportNumber', '');
      setValue('passportIssuedBy', '');
      setValue('passportIssuedAt', '');
    }
  }, [driverId]);

  return (
    <Grid container spacing={3} justify="space-between" alignItems="center">
      <Grid item xs={12} md={7}>

        <ControlledAutocomplete
          name="driver"
          fieldName="fullName"
          options={options}
          onInputChange={onChange}
          getOptionSelected={getOption}
          getOptionLabel={({ fullName }) => fullName || ''}
          onSelectionChange={(driver) => setDriverId(driver?.id)}
          label="ФИО"
          defaultValue={{}}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <BaseField name="vehicle" label="Транспортное средство" value={passportData.passportNumber} />
      </Grid>
      <Grid item xs={12} md={3}>
        <BaseField name="passportNumber" label="Номер паспорта" value={passportData.passportNumber} />
      </Grid>
      <Grid item xs={12} md={3}>
        <BaseField
          name="passportIssuedAt"
          label="Дата выдачи паспорта"
          type="date"
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <BaseField name="passportIssuedBy" label="Место выдачи паспорта" />
      </Grid>
    </Grid>
  );
};

export default DriverForm;
