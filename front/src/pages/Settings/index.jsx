import React from 'react';

import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import { THEME } from '../../constants/themes';
import PaddedContainer from 'components/PaddedContainer';

export default function Settings({ theme, onThemeChange }) {
  return (
    <PaddedContainer>
      <Typography component="h1" variant="h5" color="inherit" noWrap>
        Настройки
      </Typography>
      <Typography variant="h6" color="inherit" noWrap>
        Выбрать тему
      </Typography>
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>Светлая</Grid>
        <Grid item>
          <Switch
            checked={theme === THEME.DARK}
            onChange={() => {
              onThemeChange(theme === THEME.DARK ? THEME.LIGHT : THEME.DARK);
            }}
            value="checked"
            color="primary"
          />
        </Grid>
        <Grid item>Темная</Grid>
      </Grid>
    </PaddedContainer>
  );
}
