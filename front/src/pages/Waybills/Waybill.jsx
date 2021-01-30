import { useParams } from 'react-router-dom';

function Waybill() {
  const { id } = useParams();
  return `путевой лист ${id}`;
}

export default Waybill;
