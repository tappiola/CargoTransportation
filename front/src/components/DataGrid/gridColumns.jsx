import { Link } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import React from 'react';

export const FULLNAME = (path) => ({
  field: 'name',
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
  field: 'companyName',
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
