import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';

import { setCompany, updateCompany } from './companiesSlice';
import { companyResolver as resolver } from './companyResolver';
import SubmitButton from 'components/Buttons/SubmitButton';
import BaseField from 'components/ControlledField';
import { usePending } from 'utils';

const selector = (companyId) => ({ companies }) => {
  console.log(companies);
  return companies.companiesData.find(
    ({ id }) => id.toString() === companyId,
  );
};

const normalize = ({ ...data }, id) => ({
  ...data,
  id,
});

function Company() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const defaultValues = useSelector(selector(id));
  const methods = useForm({ defaultValues, resolver });
  const { handleSubmit, errors } = methods;

  const sendFormData = (companyId, formData) => dispatch(
    companyId
      ? updateCompany(normalize(formData, companyId))
      : setCompany(normalize(formData)),
  );

  const { bindPending, handler } = usePending(sendFormData.bind(null, id));

  return (
    <Container maxWidth="sm">
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(handler)}>
          <Grid container direction="column">
            <BaseField name="name" label="Название" />
            <FormHelperText>
              {errors.name && 'Необходимо указать название компании'}
            </FormHelperText>
            <BaseField name="unn" label="УНН" />
            <FormHelperText>
              {errors.unn && 'Необходимо указать УНН компании'}
            </FormHelperText>
            <SubmitButton {...bindPending}>Готово</SubmitButton>
          </Grid>
        </form>
      </FormProvider>
    </Container>
  );
}

export default Company;
