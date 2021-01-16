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
      transitionDuration: { exit: 20000, enter: 20000 },
      autoHideDuration: 10000000,
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
        <button onClick={() => addToast('info', 'info message')}>
          Add info toast
        </button>
        <button onClick={() => addToast('error', 'error message')}>
          Add error toast
        </button>
        <button onClick={() => addToast('success', 'success message')}>
          Add success toast
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
