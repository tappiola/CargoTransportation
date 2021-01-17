import React, { useEffect, useRef } from 'react';

import clsx from 'clsx';
import './styles.css';

const ToastItem = ({
  message, duration, type, palette, onExpire, onRemove,
}) => {
  const toastRef = useRef();

  useEffect(() => setTimeout(() => onExpire(), duration), []);

  return (
    <div
      className={clsx(
        'toast',
        type === 'default' && palette === 'dark' && 'toast__dark',
        type !== 'default' && `toast__${type}`,
      )}
      ref={toastRef}
    >
      <div>
        <svg className="toast_icon" viewBox="0 0 24 24">
          <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
        </svg>
      </div>
      {message}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className="toast__close-btn" onClick={onRemove} onKeyDown={onRemove}>
        <svg viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </div>
    </div>
  );
};

export default ToastItem;
