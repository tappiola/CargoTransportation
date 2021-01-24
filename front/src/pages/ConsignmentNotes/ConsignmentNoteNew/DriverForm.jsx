import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Grid from '@material-ui/core/Grid';

import ControlledAutocomplete from '../../../components/ControlledAutocomplete';
import * as api from 'api';
import BaseField from 'components/ControlledField';
import { ROLES } from 'constants/permissions';
import { isEmpty } from 'utils/objectUtils';

const DriverForm = () => {
  const { setValue } = useFormContext();

  const [driversData, setDriversData] = useState([]);
  const [driverId, setDriverId] = useState();
  const [passportData, setPassportData] = useState({});

  useEffect(() => {
    api.getEmployeesWithRole(ROLES.DRIVER)
      .then((data) => {
        setDriversData(data);
      });
  }, []);

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
          options={driversData}
          getOptionLabel={(option) => option.fullName || ''}
          getOptionSelected={
            (option, value) => isEmpty(value) || option.fullName === value.fullName
          }
          onSelectionChange={(value) => {
            setDriverId(value?.id);
          }}
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
