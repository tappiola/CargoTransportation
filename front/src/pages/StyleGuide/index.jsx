import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import { ToastQueueContext } from '@tappiola/material-ui-externals';

import { enqueueToast } from 'redux/actions';
import {TOAST_TYPES} from 'constants/toastsTypes';

function StyleGuide() {
  const dispatch = useDispatch();
  const onToastEnqueue = (toastData) => dispatch(enqueueToast(toastData));
  const { addToast } = useContext(ToastQueueContext);

  return (
    <>
      {/* Examples how to dispatch an action that will trigger the notification */}
      <Button onClick={() => onToastEnqueue({
        message: 'Изменения сохранены',
      })}
      >
        Add default toast
      </Button>
      <Button onClick={() => onToastEnqueue({
        message: 'ТТН №5698538 была переведена в статус "Обработана" ',
        type: TOAST_TYPES.INFO,
      })}
      >
        Add info toast
      </Button>
      <Button onClick={() => onToastEnqueue(
        {
          message: 'Произошла ошибка при попытке получить список пользователей',
          type: TOAST_TYPES.ERROR,
          duration: 5000,
        },
      )}
      >
        Add error toast
      </Button>
      {/* Examples how to trigger notification from React component directly. */}
      <Button onClick={() => addToast('Вы успешно вошли в систему', TOAST_TYPES.SUCCESS)}>
        Add success toast
      </Button>
      <Button onClick={() => addToast('Пользователь с данным логином не найден', TOAST_TYPES.WARNING)}>
        Add warning toast
      </Button>
    </>
  );
}

export default StyleGuide;
