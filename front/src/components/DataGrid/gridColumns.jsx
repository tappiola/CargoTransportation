import React from 'react';
import { NavLink } from 'react-router-dom';

import { Link, Checkbox, Button } from '@material-ui/core';
import { Search as SearchIcon, Edit as EditIcon, LocalShipping } from '@material-ui/icons';

import { ROLE_NAMES } from 'constants/permissions';
import { URLS } from 'constants/urls';

const valueOrBlank = ({ value }) => value || '-';
const getRolesCellValue = ({ value }) => (value.map((r) => ROLE_NAMES[r.role] || r.role).join(', ')) || '-';

export const FULLNAME = (path) => ({
  field: 'fullName',
  headerName: 'ФИО',
  disableClickEventBubbling: true,
  flex: 3,
  renderCell: ({ value, row }) => (
    <Link component={NavLink} to={`${path}/${row.id}`}>{value}</Link>
  ),
});

export const LEGAL_NAME = (path) => ({
  field: 'name',
  headerName: 'Название',
  disableClickEventBubbling: true,
  flex: 2,
  renderCell: ({ value, row }) => (
    <Link component={NavLink} to={`${path}/${row.id}`}>{value}</Link>
  ),
});

export const EMAIL = {
  field: 'email',
  headerName: 'Email',
  flex: 3,
  renderCell: ({ value }) => (
    <Link href={`mailto:${value}`} color="textPrimary">{value}</Link>
  ),
};

export const COMPANY = {
  field: 'companyName',
  headerName: 'Компания',
  flex: 2,
  renderCell: valueOrBlank,
};

export const ADDRESS = {
  field: 'fullAddress',
  headerName: 'Адрес',
  flex: 4,
  renderCell: valueOrBlank,
};

export const COMPANY_NAME = {
  field: 'companyName',
  headerName: 'Компания',
  flex: 3,
  renderCell: valueOrBlank,
};

export const UNN = {
  field: 'companyAccountNumber',
  headerName: 'УНП',
  flex: 1,
  renderCell: valueOrBlank,
};

export const STATUS = {
  field: 'isActive',
  headerName: 'Статус',
  flex: 2,
  renderCell: ({ value }) => (value ? 'Активный' : 'Неактивный'),
};

export const IS_TRUSTED = {
  field: 'isTrusted',
  headerName: 'Доверенный',
  flex: 2,
  renderCell: ({ value }) => <Checkbox checked={value} />,
};

export const ROLE = {
  field: 'roles',
  headerName: 'Роль',
  flex: 3,
  renderCell: getRolesCellValue,
};

export const TNN_NUMBER = (path) => ({
  field: 'number',
  headerName: 'Номер',
  flex: 2,
  renderCell: ({ value, row }) => (
    <Link component={NavLink} to={`${path}/${row.id}`}>{value}</Link>
  ),
});

export const TTN_STATUS = {
  field: 'consignment_note_status',
  headerName: 'Статус',
  width: 160,
  renderCell: ({ value }) => value?.status,
};

export const TTN_CLIENT = {
  field: 'client',
  headerName: 'Клиент',
  flex: 4,
  renderCell: ({ value }) => value?.shortFullName,
};

export const TTN_MANAGER = {
  field: 'assignedTo',
  headerName: 'Менеджер',
  flex: 4,
  renderCell: ({ value }) => value?.shortFullName,
};

export const TTN_DRIVER = {
  field: 'driver',
  headerName: 'Водитель',
  flex: 4,
  renderCell: ({ value }) => value?.shortFullName,
};

export const TTN_WAYBILL = {
  field: 'waybill',
  headerName: <LocalShipping fontSize="large" style={{ margin: '24px 16px 0' }} />,
  width: 90,
  renderCell: ({ value }) => (value
    ? (
      <Button
        variant="outlined"
        color="primary"
        to={`${URLS.WAYBILLS}/${value.id}`}
        component={NavLink}
      >
        <SearchIcon fontSize="small" />
      </Button>
    )
    : (
      <Button
        variant="outlined"
        color="primary"
        component={NavLink}
        to={`${URLS.WAYBILLS}/new`}
      >
        <EditIcon fontSize="small" />
      </Button>
    )),
};

export const WAYBILL_TTN = (path) => ({
  field: 'number',
  headerName: 'ТТН',
  flex: 2,
  renderCell: ({ value, row }) => (
    <Link component={NavLink} to={`${path}/${row.id}`}>{value}</Link>
  ),
});

export const WAYBILL_START_ADDRESS = {
  field: 'fullAddress',
  headerName: 'Начальная точка',
  flex: 4,
  renderCell: valueOrBlank,
};

export const WAYBILL_END_ADDRESS = {
  field: 'warehouse',
  headerName: 'Конечная точка',
  flex: 4,
  renderCell: ({ value }) => value?.fullAddress,
};

export const WAYBILL_STATUS = {
  field: 'waybill_status',
  headerName: ' Статус',
  flex: 3,
  renderCell: ({ value }) => value?.status,
};

export const DEPARTURE_DATE = {
  field: 'departedAt',
  headerName: 'Дата отправки',
  flex: 3,
  renderCell: ({ value }) => value && value.slice(0, 10),
};
