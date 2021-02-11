import React, { useState } from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';

import PaddedContainer from 'components/PaddedContainer';
import PaddedPaper from 'components/PaddedPaper';
import { THEME } from 'constants/themes';

export default function Settings({ theme, onThemeChange }) {
  const [muted, setMuted] = useState(localStorage.getItem('muted') === 'true');

  const switchMuted = () => {
    localStorage.setItem('muted', !muted);
    setMuted(!muted);
  };

  const switchTheme = () => (
    onThemeChange(theme === THEME.DARK ? THEME.LIGHT : THEME.DARK)
  );

  return (
    <PaddedContainer>
      <PaddedPaper title="Настройки">
        <Grid container direction="column">
          <FormControlLabel
            control={<Switch checked={theme === THEME.DARK} onChange={switchTheme} />}
            label="Темная тема"
          />
          <FormControlLabel
            control={<Switch checked={muted} onChange={switchMuted} />}
            label="Показ уведомлений"
          />
        </Grid>
      </PaddedPaper>
    </PaddedContainer>
  );
}
