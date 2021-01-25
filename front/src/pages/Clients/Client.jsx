import { useParams } from 'react-router-dom';

function Client() {
  const { id } = useParams();
  return `client ${id}`;
}

export default Client;
