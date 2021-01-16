import React, { useRef } from 'react';

import Timer from './timer';
import './styles.css';

// stale
// transform: none;
// transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;

// disappear
// transform: translateX(1280px) translateX(-972px);
// transition: transform 10000ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;

const ToastItem = ({
  message, duration, onExpire, onRemove,
}) => {
  const toastRef = useRef();

  // eslint-disable-next-line no-unused-vars
  const ownTimer = new Timer((() => {
    onExpire();
  }), duration + 5000);

  // useEffect(() => {
  //   toastRef.current.style.transform = 'translateX(-100px)';
  // }, []);

  return (
    <div
      className="toast"
      ref={toastRef}
    >
      <div className="toast__close-btn" onClick={onRemove}>
        <svg viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </div>

      {message}
    </div>
  );
};

export default ToastItem;
