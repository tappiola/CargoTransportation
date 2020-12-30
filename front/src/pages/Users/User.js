import { useParams } from 'react-router-dom';

function User() {
  const { id } = useParams();
  return `user ${id}`;
}

export default User;
