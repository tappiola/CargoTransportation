import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { format } from 'date-fns';

import ClientForm from './ClientForm';
import ConsignmentNoteForm from './ConsignmentNoteForm';
import DriverForm from './DriverForm';
import Goods from './Goods';
import ManagerForm from './ManagerForm';
import { consignmentNoteResolver as resolver } from './resolvers';
import NavButton from 'components/Buttons/NavButton';
import SubmitButton from 'components/Buttons/SubmitButton';
import FormDialog from 'components/FormDialog';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';
import PaddedPaper from 'components/PaddedPaper';
import { TOAST_TYPES } from 'constants/toastsTypes';
import { URLS } from 'constants/urls';
import Client from 'pages/Clients/Client';
import { enqueueToast } from 'redux/actions';
import { dispatchCreateConsignmentNote } from 'redux/actions/consignmentNotes';
import { usePending } from 'utils';

const normalize = (formData) => {
  const {
    consignmentNoteNumber, client, manager, driver, passportIssuedAt, goods, ...other
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
  const [isClientDialogOpen, setIsClientDialogOpen] = useState(false);

  const sendFormData = (formData) => (
    dispatch(dispatchCreateConsignmentNote(normalize(formData)))
      .then(() => {
        history.push(URLS.CONSIGNMENT_NOTES);
      })
      .catch((e) => {
        dispatch(enqueueToast({
          message: `Ошибка при создании ТТН: ${e.message}`,
          type: TOAST_TYPES.ERROR,
        }));
      })
  );
  const { bindPending, handler } = usePending(sendFormData);

  return (
    <>
      <PaddedContainer>
        <NavButton
          variant="outlined"
          to="/consignment-notes"
          startIcon={(
            <KeyboardBackspaceIcon />
        )}
        >
          К списку ТТН
        </NavButton>
        <GridToolbar title="Добавление ТТН" />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handler)}>
            <PaddedPaper title="Шаг 1 - выберите клиента">
              <ClientForm onAddClient={() => setIsClientDialogOpen(true)} />
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
        isOpen={isClientDialogOpen}
        onClose={() => setIsClientDialogOpen(false)}
      >
        <Client isPopup onPopupClose={() => setIsClientDialogOpen(false)} />
      </FormDialog>
    </>
  );
}

export default ConsignmentNoteNew;
