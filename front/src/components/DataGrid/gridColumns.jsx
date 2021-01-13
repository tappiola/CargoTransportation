import { Link } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { ROLE_NAMES } from '../../constants/permissions';
import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';

const valueOrBlank = (params) => params.value || '-';


export const FULLNAME = (path) => ({
  field: 'fullName',
  headerName: 'ФИО',
  disableClickEventBubbling: true,
  flex: 3,
  renderCell: (params) => (
    <Link component={NavLink} to={`${path}/${params.row.id}`}>{params.value}</Link>
  ),
});

export const LEGAL_NAME = (path) => ({
  field: 'name',
  headerName: 'Название',
  disableClickEventBubbling: true,
  flex: 2,
  renderCell: (params) => (
    <Link component={NavLink} to={`${path}/${params.row.id}`}>{params.value}</Link>
  ),
});

export const EMAIL = {
  field: 'email',
  headerName: 'Email',
  flex: 3,
  renderCell: (params) => <Link href={`mailto:${params.value}`} color="textPrimary">{params.value}</Link>,
};

export const COMPANY = {
  field: 'name',
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
  field: 'company_name',
  headerName: 'Компания',
  flex: 3,
  renderCell: valueOrBlank,
};

export const UNN = {
  field: 'unn',
  headerName: 'УНП',
  flex: 1,
  renderCell: valueOrBlank,
};

export const STATUS = {
  field: 'isActive',
  headerName: 'Статус',
  flex: 2,
  renderCell: (params) => (params.value ? 'Активный' : 'Неактивный'),
};

export const IS_TRUSTED = {
  field: 'isTrusted',
  headerName: 'Доверенный',
  flex: 2,
  renderCell: (params) => <Checkbox checked={params.value} />,
};

export const ROLE = {
  field: 'roles',
  headerName: 'Роль',
  flex: 3,
  renderCell: (params) => (params.value.map((r) => ROLE_NAMES[r.role] || r.role).join(', ')) || '-',
};

export const TNN_NUMBER = (path) => ({
  field: 'number',
  headerName: 'Номер',
  flex: 2,
  renderCell: (params) => (
    <Link component={NavLink} to={`${path}/${params.row.id}`}>{params.value}</Link>
  ),
});

export const TTN_STATUS = {
  field: 'consignment_note_status',
  headerName: 'Статус',
  flex: 4,
  renderCell: (params) => (params.value.status),
};

export const TTN_CLIENT = {
  field: 'client',
  headerName: 'Клиент',
  flex: 3,
  renderCell: (params) => (params.value.shortFullName),
};

export const TTN_ADDRESS = {
  field: 'warehouse',
  headerName: 'Cклад',
  flex: 4,
  renderCell: (params) => (params.value.fullAddress),
};

export const TTN_MANAGER = {
  field: 'assignedTo',
  headerName: 'Менеджер',
  flex: 3,
  renderCell: (params) => (params.value.shortFullName),
};

export const TTN_DRIVER = {
  field: 'driver',
  headerName: 'Водитель',
  flex: 3,
  renderCell: (params) => (params.value.shortFullName),
};

export const WAYBILL_TTN = (path) => ({
  field: 'number',
  headerName: 'ТТН',
  flex: 2,
  renderCell: (params) => (
    <Link component={NavLink} to={`${path}/${params.row.id}`}>{params.value}</Link>
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
  renderCell: (params) => (params.value.fullAddress),
};

export const WAYBILL_STATUS = {
  field: 'waybill_status',
  headerName: ' Статус',
  flex: 3,
  renderCell: (params) => (params.value.status),
};

export const DEPARTURE_DATE = {
  field: 'departedAt',
  headerName: 'Дата отправки',
  flex: 3,
  renderCell: (params) => (params.value.slice(0, 10)),
};
