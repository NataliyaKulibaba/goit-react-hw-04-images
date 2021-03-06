import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import s from '../Modal/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, children }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropclick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={handleBackdropclick}>
      <div className={s.modal}>{children}</div>
      <button className={s.btnCloseModal} type="button" onClick={onClose}>
        x
      </button>
    </div>,
    modalRoot
  );
}

export default Modal;
