import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { ToastQueueContext } from 'components/Notification';

function MyApp() {
  const { enqueueSnackbar } = useSnackbar();
  const { addToast } = useContext(ToastQueueContext);

  const handleClick = () => {
    enqueueSnackbar('I love snacks.', {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      transitionDuration: { exit: 2000, enter: 2000 },
      autoHideDuration: 55000,
    });
  };

  const handleClickVariant = (variant) => () => {
    enqueueSnackbar('This is a success message!', {
      variant,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show snackbar</Button>
      <Button onClick={handleClickVariant('success')}>Show success snackbar</Button>
      <div className="Example">
        <button onClick={() => addToast('default message')}>
          Add default toast
        </button>
        <button onClick={() => addToast('info message', 'info')}>
          Add info toast
        </button>
        <button onClick={() => addToast('error message', 'error')}>
          Add error toast
        </button>
        <button onClick={() => addToast('success message', 'success')}>
          Add success toast
        </button>
        <button onClick={() => addToast('warning message', 'warning')}>
          Add warning toast
        </button>
      </div>
    </>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp />
    </SnackbarProvider>
  );
}
