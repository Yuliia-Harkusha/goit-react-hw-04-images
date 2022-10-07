import { useEffect } from 'react';
import propTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow, CloseButton } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ onClose, content, children }) => {
  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  });

  return createPortal(
    <Overlay onClick={closeModal}>
      <ModalWindow>
        <img src={content} alt="" loading="lazy" />
        <CloseButton onClick={closeModal}>X</CloseButton>
        {children}
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.proptypes = {
  onClose: propTypes.func,
  content: propTypes.string,
  children: propTypes.element,
};
