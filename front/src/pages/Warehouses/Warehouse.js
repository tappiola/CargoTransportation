import { useParams } from 'react-router-dom';

function Warehouse() {
  const { id } = useParams();
  return `склад ${id}`;
}

export default Warehouse;
