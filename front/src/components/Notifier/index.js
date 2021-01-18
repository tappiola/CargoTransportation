import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ToastQueueContext } from '@tappiola/material-ui-externals';

import { processToast } from '../../redux/actions';

function Notifier() {
  // eslint-disable-next-line no-shadow
  const { notifications } = useSelector(({ notifications }) => notifications);
  const dispatch = useDispatch();
  const onToastProcess = () => dispatch(processToast());

  const { addToast } = useContext(ToastQueueContext);

  useEffect(() => {
    if (notifications.length > 0) {
      const { message, type, duration } = notifications[0];

      addToast(message, type, duration);
      onToastProcess();
    }
  }, [notifications]);

  return null;
}

export default Notifier;
