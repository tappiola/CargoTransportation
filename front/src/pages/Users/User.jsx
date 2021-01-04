import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import NewCompanyForm from 'components/NewCompanyForm';

function User({ data }) {
  const { id } = useParams();
  let prevUserData;
  if (id) {
    const currentUser = data.find(({ id: _id }) => _id.toString() === id);
    const [firstname, surname, middleName] = currentUser.name.split(' ');
    prevUserData = {
      ...currentUser, firstname, surname, middleName,
    };
  }

  return (
    <NewCompanyForm
      prevUserData={prevUserData}
    />
  );
}

export default connect(({ users }) => ({ data: users.usersData }))(User);
