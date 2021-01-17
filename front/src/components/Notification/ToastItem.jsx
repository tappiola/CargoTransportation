import React, { useEffect, useRef } from 'react';

import clsx from 'clsx';
import './styles.css';

const TOAST_ICONS = {
  info: 'M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z',
  success: "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z",
  warning: "M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z",
  error: "M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
}

const ToastItem = ({
  message, duration, type, palette, onExpire, onRemove,
}) => {
  const toastRef = useRef();

  useEffect(() => setTimeout(() => onExpire(), duration), []);

  return (
    <div
      className={clsx(
        'toast',
        // 'SnackbarItem-contentRoot-58',
        type === 'default' && palette === 'dark' && 'toast__dark',
        type !== 'default' && `toast__${type}`,
      )}
      ref={toastRef}
    >
      <div className="toast__label">
        {TOAST_ICONS[type] && <svg className="toast_icon" viewBox="0 0 24 24">
          <path d={TOAST_ICONS[type]} />
        </svg>}
        {message}
      </div>
        <svg viewBox="0 0 24 24" className={clsx('toast__close-btn', palette === 'dark' && 'toast__close-btn__dark')} onClick={onRemove} onKeyDown={onRemove}>
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
    </div>
  );
};

export default ToastItem;
