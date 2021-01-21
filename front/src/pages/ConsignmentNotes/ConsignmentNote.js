import { useParams } from 'react-router-dom';

function ConsignmentNote() {
  const { id } = useParams();
  return `ТТН ${id}`;
}

export default ConsignmentNote;
