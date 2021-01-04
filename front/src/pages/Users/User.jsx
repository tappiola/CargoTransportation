import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import NewCompanyForm from 'components/NewCompanyForm';

function User({ data }) {
  const { id } = useParams();
  const {
    name: fullname, email, adress, roles, birthDate,
  } = data.find(({ id: _id }) => _id.toString() === id);
  const [firstname, surname, middleName] = fullname.split(' ');
  return (
    <NewCompanyForm
      prevUserData={{
        firstname,
        email,
        surname,
        middleName,
        adress,
        password: '',
        roles,
        birthDate,
      }}
    />
  );
}

export default connect(({ users }) => ({ data: users.usersData }))(User);
