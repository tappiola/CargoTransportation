import React from 'react';
import './main.css';

export default function ConfirmDialog({
  title, description, onPopupClose, onActionConfirm,
}) {
  return (
    <>
      <div className="confirmDialog MuiPaper-root">
        <h2 className="confirmDialog__title">{title}</h2>
        <div
          className="confirmDialog__description MuiTypography-body1 MuiTypography-colorTextSecondary"
        >
          {description}
        </div>
        <div className="confirmDialog__buttons">
          <button
            onClick={onPopupClose}
            className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textSecondary"
          >
            Отменить
          </button>
          <button
            onClick={() => {
              onActionConfirm();
              onPopupClose();
            }}
            className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary"
          >
            Подтвердить
          </button>
        </div>
      </div>
      <div className="backdrop" />
    </>
  );
}
