import { createPortal } from 'react-dom';
import React, { useState } from 'react';
import './styles.css';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ToastItem from './ToastItem';

export const ToastQueueContext = React.createContext();
const { Provider } = ToastQueueContext;

const DEFAULT_DURATION = 3000;

function ToastQueueProvider({ children, theme }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'default', duration = DEFAULT_DURATION) => {
    const toast = {
      id: Date.now(), message, type, palette: theme?.palette?.type || 'light', duration,
    };
    setToasts((currentToasts) => [toast, ...currentToasts]);
  };

  const handleRemove = (id) => {
    setToasts((currentToasts) => [...currentToasts.filter((toast) => toast.id !== id)]);
  };

  return (
    <Provider value={{ addToast, remove: handleRemove, toasts }}>
      {children}

      {createPortal((
        <div className="toasts-container">
          <TransitionGroup>
            {toasts.map((toast) => (
              <CSSTransition
                key={toast.id}
                timeout={500}
                unmountOnExit
                classNames="toast"
              >
                <ToastItem
                  {...toast}
                  onExpire={() => handleRemove(toast.id)}
                  onRemove={() => handleRemove(toast.id)}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      ),
      document.body)}

    </Provider>
  );
}

export default ToastQueueProvider;
