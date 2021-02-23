import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import { getVehicles } from '../../Vehicles/vehiclesSlice';
import * as api from 'api';
import ControlledAutocomplete from 'components/ControlledAutocomplete';
import BaseField, { DateField } from 'components/ControlledField';
import { ELASTIC_INDICIES } from 'constants/elastic';
import { useElastic } from 'utils';

const DriverForm = () => {
  const dispatch = useDispatch();
  const [driverId, setDriverId] = useState();
  const [passportData, setPassportData] = useState({});

  const { setValue } = useFormContext();
  const { options, onChange } = useElastic(ELASTIC_INDICIES.DRIVERS, 'fullName');

  const getOption = ({ fullName: option }, { fullName: value }) => (!option) || option === value;
  const getCarOption = ({ number: option }, { number: value }) => (!option) || option === value;

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

  const vehiclesData = useSelector(({ vehicles }) => vehicles.vehiclesData);
  useEffect(() => {
    if (!vehiclesData.length) {
      dispatch(getVehicles());
    }
  });

  return (
    <Grid container spacing={3} justify="space-between" alignItems="flex-start">
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
        <ControlledAutocomplete
          name="vehicle"
          fieldName="vehicleNumber"
          options={vehiclesData}
          getOptionLabel={(option) => option.number || ''}
          getOptionSelected={getCarOption}
          label="Транспортное средство"
          defaultValue={{}}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <BaseField name="passportNumber" label="Номер паспорта" value={passportData.passportNumber} />
      </Grid>
      <Grid item xs={12} md={3}>
        <DateField name="passportIssuedAt" label="Дата выдачи паспорта" />
      </Grid>
      <Grid item xs={12} md={6}>
        <BaseField name="passportIssuedBy" label="Место выдачи паспорта" />
      </Grid>
    </Grid>
  );
};

export default DriverForm;
