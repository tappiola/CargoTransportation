import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
// import { ToastQueueContext } from 'components/Notification';
import { ToastQueueContext } from '@tappiola/material-ui-externals/dist';

export default function StyleGuide() {
  const { addToast } = useContext(ToastQueueContext);

  return (
    <>
      <Button onClick={() => addToast('Изменения сохранены')}>
        Add default toast
      </Button>
      <Button onClick={() => addToast('ТТН №5698538 была переведена в статус "Обработана" ', 'info')}>
        Add info toast
      </Button>
      <Button onClick={() => addToast('Произошла ошибка при попытке получить список пользователей', 'error', 5000)}>
        Add error toast
      </Button>
      <Button onClick={() => addToast('Вы успешно вошли в систему', 'success')}>
        Add success toast
      </Button>
      <Button onClick={() => addToast('Пользователь с данным логином не найден', 'warning')}>
        Add warning toast
      </Button>
    </>
  );
}
