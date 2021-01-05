import React from 'react';

import Grid from '@material-ui/core/Grid';
import CityField from './CityField';
import StreetField from './StreetField';
import HouseField from './HouseField';
import ApartmentField from './ApartmentField';

export const AdressBlock = ({ register, defaultValue, error }) => {
  const { city, street, house } = error?.adress || {};
  return (
    <Grid container spacing={1}>
      <Grid item xs={6} sm={4}>
        <CityField
          error={city}
          defaultValue={defaultValue.city}
          register={register({ required: true, minLength: 2 })}
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <StreetField
          error={street}
          defaultValue={defaultValue.street}
          register={register({ required: true, minLength: 2 })}
        />
      </Grid>
      <Grid item xs={6} sm={2}>
        <HouseField
          defaultValue={defaultValue.house}
          error={!!house}
          register={register({
            required: true,
            pattern: /^\d{1,3}[а-яa-z]{0,1}$/,
          })}
        />
      </Grid>
      <Grid item xs={6} sm={2}>
        <ApartmentField
          defaultValue={defaultValue.apartment}
          register={register}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};
