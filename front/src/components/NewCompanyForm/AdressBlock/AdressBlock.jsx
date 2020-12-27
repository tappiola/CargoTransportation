import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { useInput } from '../../../utils';
import * as validators from '../validators';

export const AdressBlock = ({ bindAdress }) => {
  const { value: city, bind: bindCity } = useInput('');
  const { value: street, bind: bindStreet } = useInput('');
  const { value: house, bind: bindHouse } = useInput('');
  const { value: apartment, bind: bindApartment } = useInput('');
  const [cityError, setCityError] = React.useState(false);
  const [streetError, setStreetError] = React.useState(false);
  const [houseError, setHouseError] = React.useState(false);

  const validateCity = () => {
    const isCityValid = !!validators.textValidator(city);
    setCityError(!isCityValid);
  };

  const validateStreet = () => {
    const isStreetValid = !!validators.textValidator(street);
    setStreetError(!isStreetValid);
  };

  const validateHouse = () => {
    const isHouseValid = !!parseInt(house, 10);
    setHouseError(!isHouseValid);
  };

  useEffect(() => {
    if (!cityError && !streetError && !houseError) {
      bindAdress({
        city,
        street,
        house,
        apartment,
      });
    }
  }, [city, street, house, apartment]);

  return (
    <Grid container item spacing={1}>
      <Grid item xs={6} sm={4}>
        <TextField
          label="Город"
          name="city"
          fullWidth
          required
          autoComplete="address-level2"
          error={cityError}
          onBlur={validateCity}
          {...bindCity}
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField
          label="Улица"
          name="street"
          fullWidth
          required
          error={streetError}
          onBlur={validateStreet}
          {...bindStreet}
        />
      </Grid>
      <Grid item xs={6} sm={2}>
        <TextField
          label="Дом"
          name="house"
          autoComplete="address-level3"
          fullWidth
          required
          error={houseError}
          onBlur={validateHouse}
          {...bindHouse}
        />
      </Grid>
      <Grid item xs={6} sm={2}>
        <TextField
          label="Квартира"
          autoComplete="address-level4"
          fullWidth
          {...bindApartment}
        />
      </Grid>
    </Grid>
  );
};

AdressBlock.propTypes = {
  bindAdress: PropTypes.func.isRequired,
};
