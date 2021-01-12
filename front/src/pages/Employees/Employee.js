import { useParams } from 'react-router-dom';

function Employee() {
  const { id } = useParams();
  return `user ${id}`;
}

export default Employee;
