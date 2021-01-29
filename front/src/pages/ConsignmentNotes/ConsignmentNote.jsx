import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { format } from 'date-fns';

import * as api from 'api';
import Index from 'components/Buttons/BackButton';
import SubmitButton from 'components/Buttons/SubmitButton';
import ControlledAutocomplete from 'components/ControlledAutocomplete';
import ControlledField from 'components/ControlledField';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';
import PaddedPaper from 'components/PaddedPaper';
import { CONSIGNMENT_NOTES_STATUSES_ID } from 'constants/permissions';
import { TOAST_TYPES } from 'constants/toastsTypes';
import { enqueueToast } from 'redux/actions';
import { usePending, yup } from 'utils';

const TABLE_COLUMNS = ['Наименование', 'Кол-во', 'Ед. измерения', 'Стоимость (руб)', 'Масса (кг)', 'Примечания'];

const resolver = yupResolver(yup.object().shape({
  warehouse: yup.object({
    name: yup.string().required('Выберите хотя бы один склад'),
  }),
}));

function ConsignmentNote() {
  const history = useHistory();
  const dispatch = useDispatch();
  const methods = useForm({ resolver });
  const { handleSubmit, setValue, reset: updateForm } = methods;
  const { id: consignmentNoteId } = useParams();
  const [goodsData, setGoodsData] = useState([]);
  const [isNoteIssued, setIsNoteIssued] = useState(true);
  const [warehousesData, setWarehousesData] = useState([]);

  const sendFormData = ({ warehouse: { id: warehouseId } }) => api
    .aproveConsignmentNote(consignmentNoteId)
    .then(api
      .precreateWaybill({ consignmentNoteId, warehouseId })
      .then(({ id }) => history.push(`/waybills/${id}`)))
    .catch((err) => dispatch(enqueueToast({
      message: err.message,
      type: TOAST_TYPES.ERROR,
    })));

  const { bindPending, handler } = usePending(sendFormData);

  useEffect(() => {
    api.getWarehouses().then((data) => setWarehousesData(data));
    api.getConsignmentNote(consignmentNoteId).then(({ consignmentNote, goods }) => {
      const { VERIFIED } = CONSIGNMENT_NOTES_STATUSES_ID;
      const isCheckedNote = consignmentNote?.consignmentNoteStatusId === VERIFIED;
      if (isCheckedNote) {
        api.getWarehouse(consignmentNoteId)
          .then((warehouse) => {
            setValue('warehouse', warehouse);
            setValue('warehouse.fullAddress', warehouse.fullAddress);
          });
      }
      setIsNoteIssued(isCheckedNote);
      setGoodsData(goods);
      updateForm({
        ...consignmentNote,
        registerDate: format(new Date(), 'yyyy-MM-dd'),
      });
    });
  }, []);

  return (
    <PaddedContainer>
      <Index link="/consignment-notes" text="К списку TTH" />
      <GridToolbar title="Проверка ТТН" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handler)}>
          <PaddedPaper title="Данные о накладной">
            <ControlledField name="number" label="Номер накладной" disabled />
            <ControlledField name="createdBy.shortFullName" label="Зарегистрировал" disabled />
            <ControlledField name="registerDate" label="Дата регистрации" type="date" InputLabelProps={{ shrink: true }} disabled />
            <ControlledField name="assignedTo.shortFullName" label="Проверил" disabled />
            <ControlledField name="issuedDate" label="Дата оформления" type="date" InputLabelProps={{ shrink: true }} disabled />
            <ControlledField name="client.shortFullName" label="Клиент" disabled />
            <ControlledField name="driver.shortFullName" label="Водитель" disabled />
          </PaddedPaper>
          <PaddedPaper title="Товарная партия">
            <Table>
              <TableHead>
                <TableRow>
                  {TABLE_COLUMNS.map((item) => <TableCell key={item}>{item}</TableCell>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {goodsData.map(({
                  name: item, unit, weight, cost, notes, quantity,
                }) => (
                  <TableRow key={item}>
                    {Object.entries({
                      item, quantity, unit, cost, weight, notes,
                    }).map(([key, value]) => <TableCell key={`${value}-${key}`}>{value}</TableCell>)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </PaddedPaper>
          <PaddedPaper title="Пункт назначения">
            <ControlledAutocomplete
              label="Склад"
              name="warehouse"
              fieldName="name"
              defaultValue={{}}
              disabled={isNoteIssued}
              options={warehousesData}
              getOptionLabel={(option) => option.name || ''}
              getOptionSelected={(val, opt) => opt?.warehouse?.name === val?.warehouse?.name}
            />
            {isNoteIssued && <ControlledField name="warehouse.fullAddress" label="Адрес" disabled />}
          </PaddedPaper>
          <SubmitButton {...bindPending}>Отметить как проверенную</SubmitButton>
        </form>
      </FormProvider>
    </PaddedContainer>
  );
}

export default ConsignmentNote;
