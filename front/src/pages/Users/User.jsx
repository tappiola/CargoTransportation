import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import UserForm from 'components/UserForm';

function User({ data }) {
  const { id } = useParams();
  let prevUserData;
  if (id) {
    // temporary solution
    const currentUser = data.find(({ id: _id }) => _id.toString() === id);
    const [firstname, surname, middleName] = currentUser.name.split(' ');
    // eslint-disable-next-line object-curly-newline
    const { email, roles, adress, birthDate } = currentUser;
    prevUserData = {
      email, roles, adress, birthDate, firstname, surname, middleName,
    };
  }

  return (
    <UserForm prevUserData={prevUserData} />
  );
}

export default connect(({ users }) => ({ data: users.usersData }))(User);
