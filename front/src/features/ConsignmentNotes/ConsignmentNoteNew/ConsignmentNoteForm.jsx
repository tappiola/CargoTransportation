import React from 'react';

import Grid from '@material-ui/core/Grid';

import BaseField, { DateField } from 'components/ControlledField';

const ConsignmentNoteForm = () => (
  <Grid container spacing={3} justify="space-between" alignItems="center">
    <Grid item xs={12} md={6}>
      <BaseField name="consignmentNoteNumber" label="Номер" />
    </Grid>
    <Grid item xs={12} md={6}>
      <DateField
        name="issuedDate"
        label="Дата выдачи"
        defaultValue={new Date().toISOString().slice(0, 10)}
        disabled
      />
    </Grid>
  </Grid>
);

export default ConsignmentNoteForm;
