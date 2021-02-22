import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { parseISO, format } from 'date-fns';
import Goods from 'features/ConsignmentNotes/ConsignmentNoteNew/Goods';

import { updateReport, setReport } from './actSlice';
import Index from 'components/Buttons/BackButton';
import SubmitButton from 'components/Buttons/SubmitButton';
import ControlledAutocomplete from 'components/ControlledAutocomplete';
import BaseField, { DateField } from 'components/ControlledField';
import GridToolbar from 'components/GridToolbar';
import PaddedContainer from 'components/PaddedContainer';
import PaddedPaper from 'components/PaddedPaper';

const TABLE_COLUMNS = ['Наименование', 'Кол-во', 'Ед. измерения', 'Стоимость (руб)', 'Масса (кг)', 'Примечания'];

const Act = () => {
  const { id: reportId } = useParams();
  const dispatch = useDispatch();
  const { goods, ...defaultValues } = useSelector(({ reports }) => {
    if (!reportId) {
      return {};
    }
    const { reportedAt, ...report } = reports.reportsData.find(({ id }) => id === Number(reportId));
    return {
      ...report,
      reportedAt: format(parseISO(reportedAt), 'yyyy-MM-dd'),
    };
  });

  const { driversData, companiesData } = useSelector(({ employees, copmanies }) => ({
    driversData: employees.employeesData
      .filter(({ roles }) => roles.some(({ role }) => role === 'driver')),
    companiesData: copmanies?.companiesData || [],
  }));

  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;
  const disabled = !!reportId;

  const sendFormData = ({ linkedCompany, user, goods: gs, reportedAt, consignmentNoteId }) => {
    const formData = {
      userId: user?.id,
      consignmentNoteId,
      linkedCompanyId: linkedCompany?.id,
      goods: gs,
      reportedAt,
    };

    return dispatch(
      reportId
        ? updateReport({ formData, reportId })
        : setReport(formData),
    );
  };

  return (
    <PaddedContainer>
      <Index link="/acts" text="К списку актов" />
      <GridToolbar title="Просмотр акта утери" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(sendFormData)}>
          <PaddedPaper>
            <BaseField name="id" label="Номер акта" disabled={disabled} />
            <BaseField name="consignmentNoteId" label="Номер накладной" disabled={disabled} />
            <ControlledAutocomplete
              name="linkedCompany"
              fieldName="fullName"
              options={companiesData}
              getOptionLabel={({ name }) => name || ''}
              label="Заказчик"
              defaultValue={defaultValues?.linkedCompany?.name}
              disabled={disabled}
            />
            <DateField name="reportedAt" label="Дата регистрации" disabled={disabled} />
            <ControlledAutocomplete
              name="user"
              fieldName="shortFullName"
              options={driversData}
              getOptionLabel={({ shortFullName }) => shortFullName || ''}
              label="Ответственный"
              defaultValue={defaultValues?.responsible}
              disabled={disabled}
            />
          </PaddedPaper>
          <PaddedPaper title="Товарная партия">
            {disabled ? (
              <Table>
                <TableHead>
                  <TableRow>
                    {TABLE_COLUMNS.map((item) => <TableCell key={item}>{item}</TableCell>)}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {goods && goods.map(({
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
            ) : (
              <Goods />
            )}
          </PaddedPaper>
          <SubmitButton>Сохранить</SubmitButton>
        </form>
      </FormProvider>
    </PaddedContainer>
  );
};

export default Act;
