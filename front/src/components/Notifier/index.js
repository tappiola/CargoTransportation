import { useContext, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { ToastQueueContext } from '@tappiola/material-ui-externals';
import {loginUser, processToast} from '../../redux/actions';

function Notifier({ onToastProcess }) {
  const { notificationsQueue } = useSelector(({ notifications }) => notifications);
const dispatch = useDispatch();
const sendFormData = ({ email, password }) => dispatch(loginUser(email, password));
const onToastProcess = (dispatch) => ({ onToastProcess: () => dispatch(processToast()) });


  const { addToast } = useContext(ToastQueueContext);

  useEffect(() => {
    if (notificationsQueue.length > 0) {
      const { message, type, duration } = notificationsQueue[0];

      addToast(message, type, duration);
      onToastProcess();
    }
  }, [notificationsQueue]);

  return null;
}

// const mapStateToProps = ({ notifications: { notifications } }) => ({
//   notifications,
// });

const mapDispatchToProps = (dispatch) => ({ onToastProcess: () => dispatch(processToast()) });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifier);
