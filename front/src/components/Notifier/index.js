import { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { ToastQueueContext } from '@tappiola/material-ui-externals';
import { processToast } from '../../redux/actions';

function Notifier({ notifications, onToastProcess }) {
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

const mapStateToProps = ({ notifications: { notifications } }) => ({
  notifications,
});

const mapDispatchToProps = (dispatch) => ({ onToastProcess: () => dispatch(processToast()) });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifier);
