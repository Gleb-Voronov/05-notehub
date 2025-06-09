import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import css from './NoteModal.module.css';

interface NoteModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={css.close}>×</button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default NoteModal;
