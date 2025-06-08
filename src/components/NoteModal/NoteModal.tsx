import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import NoteForm from '../NoteForm/NoteForm';
import css from './NoteModal.module.css';

interface NoteModalProps {
  onClose: () => void;
}

const modalRoot = document.getElementById('modal-root') as HTMLElement;

const NoteModal: React.FC<NoteModalProps> = ({ onClose }) => {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={onBackdropClick}>
      <div className={css.modal}>
        <NoteForm onClose={onClose} />
      </div>
    </div>,
    modalRoot
  );
};

export default NoteModal;
