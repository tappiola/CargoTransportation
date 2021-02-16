import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { format } from 'date-fns';
import Client from 'features/Clients/Client';
import { enqueueToast } from 'features/Notifier/NotifierSlice';

import { dispatchCreateConsignmentNote } from '../consignmentNotesSlice';
import ClientForm from './ClientForm';
import ConsignmentNoteForm from './ConsignmentNoteForm';
import DriverForm from './DriverForm';
import Goods from './Goods';
import ManagerForm from './ManagerForm';
import { consignmentNoteResolver as resolver } from './resolvers';
import BackButton from 'components/Buttons/BackButton';
import SubmitButton from 'components/Buttons/SubmitButton';
import FormDialog from 'components/FormDialog';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';
import PaddedPaper from 'components/PaddedPaper';
import { TOAST_TYPES } from 'constants/toastsTypes';
import { URLS } from 'constants/urls';
import { usePending } from 'utils';

const normalize = (formData) => {
  const {
    consignmentNoteNumber,
    client,
    manager,
    driver,
    passportIssuedAt,
    goods,
    ...other
  } = formData;
  const goodsData = goods.map(({ id, ...data }) => data);

  return {
    ...other,
    number: Number(consignmentNoteNumber),
    clientId: client.id,
    driverId: driver.id,
    passportIssuedAt: format(passportIssuedAt, 'yyyy-MM-dd'),
    assignedToId: manager.id,
    goods: goodsData,
  };
};

function ConsignmentNoteNew() {
  const history = useHistory();
  const dispatch = useDispatch();

  const methods = useForm({ resolver, mode: 'onBlur' });
  const { handleSubmit } = methods;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const sendFormData = (formData) => dispatch(dispatchCreateConsignmentNote(normalize(formData)))
    .then(() => history.push(history.push(URLS.CONSIGNMENT_NOTES)))
    .catch((e) => {
      dispatch(
        enqueueToast({
          message: `Ошибка при создании ТТН: ${e.message}`,
          type: TOAST_TYPES.ERROR,
        }),
      );
    });
  const { bindPending, handler } = usePending(sendFormData);

  return (
    <>
      <PaddedContainer>
        <BackButton link="/warehouses" text="К списку складов" />
        <GridToolbar title="Добавление ТТН" />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handler)}>
            <PaddedPaper title="Шаг 1 - выберите клиента">
              <ClientForm onAddClient={() => setIsDialogOpen(true)} />
            </PaddedPaper>
            <PaddedPaper title="Шаг 2 - заполните данные ТТН">
              <ConsignmentNoteForm />
            </PaddedPaper>
            <PaddedPaper title="Шаг 3 - введите данные водителя">
              <DriverForm />
            </PaddedPaper>
            <PaddedPaper title="Шаг 4 - введите данные о грузе">
              <Goods />
            </PaddedPaper>
            <PaddedPaper title="Шаг 5 - выберите менеджера для обработки ТТН">
              <ManagerForm />
            </PaddedPaper>
            <SubmitButton {...bindPending}>Готово</SubmitButton>
          </form>
        </FormProvider>
      </PaddedContainer>
      <FormDialog
        title="Добавление клиента"
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        <Client isPopup onPopupClose={() => setIsDialogOpen(false)} />
      </FormDialog>
    </>
  );
}

export default ConsignmentNoteNew;
