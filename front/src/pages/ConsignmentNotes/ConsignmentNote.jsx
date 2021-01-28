import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { format } from 'date-fns';

import Index from 'components/Buttons/BackButton';
import SubmitButton from 'components/Buttons/SubmitButton';
import ControlledField from 'components/ControlledField';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';
import PaddedPaper from 'components/PaddedPaper';
import { TOAST_TYPES } from 'constants/toastsTypes';
import {
  enqueueToast,
  dispatchCreateWaybill,
  dispatchGetConsignmentNote,
  dispatchConfirmConsigmentNote,
} from 'redux/actions';
import { usePending } from 'utils';

const TABLE_COLUMNS = ['Наименование', 'Кол-во', 'Ед. измерения', 'Стоимость (руб)', 'Масса (кг)', 'Примечания'];

function ConsignmentNote() {
  const history = useHistory();
  const { id: documentId } = useParams();
  const dispatch = useDispatch();
  const { goods } = useSelector(({ consignmentNotes }) => consignmentNotes.current);
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    dispatch(dispatchGetConsignmentNote(documentId)).then(({ consignmentNote }) => {
      const registerDate = format(new Date(), 'yyyy-MM-dd');
      reset({ ...consignmentNote, registerDate }); // for form re-render
    });
  }, []);

  const sendFormData = () => dispatch(dispatchConfirmConsigmentNote(documentId))
    .then(dispatch(dispatchCreateWaybill(documentId))
      .then(({ id }) => {
        history.push(`/waybills/${id}`);
      }))
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
    <PaddedContainer>
      <Index link="/consignment-notes" text="К списку TTH" />
      <GridToolbar title="Проверка ТТН" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handler)}>
          <PaddedPaper title="Данные о накладной">
            <ControlledField name="number" label="Номер накладной" disabled />
            <ControlledField name="createdBy.shortFullName" label="Зарегистрировал" disabled />
            <ControlledField
              name="registerDate"
              label="Время регистрации"
              type="date"
              InputLabelProps={{ shrink: true }}
              disabled
            />
            <ControlledField name="assignedTo.shortFullName" label="Проверил" disabled />
            <ControlledField
              name="issuedDate"
              label="Время оформления"
              type="date"
              InputLabelProps={{ shrink: true }}
              disabled
            />
            <ControlledField name="client.shortFullName" label="Клиент" disabled />
            <ControlledField name="driver.shortFullName" label="Водитель" disabled />
          </PaddedPaper>

          <PaddedPaper title="Товарная партия">
            <Table>
              <TableHead>
                <TableRow>
                  {TABLE_COLUMNS.map((item) => <TableCell>{item}</TableCell>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {goods.map(({
                  name: item, unit, weight, cost, notes, quantity,
                }) => (
                  <TableRow key={item}>
                    <TableCell>{item}</TableCell>
                    <TableCell>{quantity}</TableCell>
                    <TableCell>{unit}</TableCell>
                    <TableCell>{cost}</TableCell>
                    <TableCell>{weight}</TableCell>
                    <TableCell>{notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </PaddedPaper>

          <PaddedPaper title="Пункт назначения">
            <ControlledField name="" />
          </PaddedPaper>
          <SubmitButton {...bindPending}>Отметить как проверенную</SubmitButton>
        </form>
      </FormProvider>
    </PaddedContainer>
  );
}

export default ConsignmentNote;
