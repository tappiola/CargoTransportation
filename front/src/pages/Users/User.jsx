import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import NewCompanyForm from 'components/NewCompanyForm';

function User({ ...prevUserData }) {
  const { id } = useParams();
  return (<NewCompanyForm id={id} prevUserData={{ ...prevUserData, firstName: id }} />);
}

export default connect(
  ({ users }) => ({ ...users.userToUpdate }),
)(User);
