import { Link } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { ROLE_NAMES } from 'constants/permissions';

export const FULLNAME = (path) => ({
  field: 'fullName',
  headerName: 'ФИО',
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
};

export const UNN = {
  field: 'unn',
  headerName: 'УНП',
  flex: 1,
};

export const STATUS = {
  field: 'isActive',
  headerName: 'Статус',
  flex: 1,
  renderCell: (params) => (params.value ? 'Активный' : 'Неактивный'),
};

export const ROLE = {
  field: 'roles',
  headerName: 'Роль',
  flex: 2,
  renderCell: (params) => (params.value.map((r) => ROLE_NAMES[r.role] || r.role).join(', ')),
};
