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
  flex: 2,
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
  flex: 2,
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
  flex: 3,
  renderCell: valueOrBlank,
};

export const COMPANY_NAME = {
  field: 'company_name',
  headerName: 'Компания',
  flex: 2,
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
  flex: 1,
  renderCell: (params) => (params.value ? 'Активный' : 'Неактивный'),
};

export const IS_TRUSTED = {
  field: 'isTrusted',
  headerName: 'Доверенный',
  flex: 1,
  renderCell: (params) => <Checkbox checked={params.value} />,
};

export const ROLE = {
  field: 'roles',
  headerName: 'Роль',
  flex: 2,
  renderCell: (params) => (params.value.map((r) => ROLE_NAMES[r.role] || r.role).join(', ')) || '-',
};
